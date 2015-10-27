(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('StagesController', StagesController);

  StagesController.$inject = ['$scope'];

  function StagesController($scope) {
    var vm = this;

    vm.stages = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.stages; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.stages = [];

        for (var i = 0; i < current.length; i++) {
          vm.stages.push(current[i]);
          console.log('here in render');
        }
      }
    }
  }
})();
