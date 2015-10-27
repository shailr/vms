(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('StageListController', StageListController);

  StageListController.$inject = ['$location', '$routeParams', '$scope', 'Stages'];

  function StageListController($location, $routeParams, $scope, Stages) {
    var vm = this;

    vm.stages = [];

    activate();

    function activate() {
      var id = $routeParams.id;

      Stages.all(id)
        .then(stageListSuccessFn, stageListErrorFn);

      $scope.$on('stage.created', function(event, stage) {
        vm.stages.unshift(stage);
      });

      $scope.$on('stage.created.error', function() {
        vm.stages.shift();
      });

      function stageListSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
        console.log('vm.stages = ', vm.stages);
      }

      function stageListErrorFn(data, status, headers, config) {
        console.log('MASSIVE THROBBING ERROR IN STAGE LIST CONTROLLER');
        $location.url('/applications/' + id);
      }
    }
  }
})();
