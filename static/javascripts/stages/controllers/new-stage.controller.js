(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('NewStageController', NewStageController);

  NewStageController.$inject = ['$routeParams', '$rootScope', '$scope', 'Stages', 'Applications'];

  function NewStageController($routeParams, $rootScope, $scope, Stages, Applications) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.submit = submit;

    function submit() {
      Applications.get(vm.id)
        .then(ApplicationGetSuccessFn, ApplicationGetErrorFn);

      function ApplicationGetSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('stage.created', {
          name: vm.name,
          id: vm.id
        });

        vm.application = data.data;

        console.log('vm.application', vm.application);

        $scope.closeThisDialog();

        Stages.create(vm.application, vm.name)
          .then(createStageSuccessFn, createStageErrorFn);

        function createStageSuccessFn(data, status, headers, config) {
          console.log('Stage Created');
          console.log(data.data);
        }

        function createStageErrorFn(data, status, headers, config) {
          console.log('MASSIVE THROBBING ERROR IN NEW STAGE CONTROLLER');
          $rootScope.$broadcast('stage.created.error');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, config) {
        console.log('Error in New Stage controller from application get function');
      }
    }
  }
})();
