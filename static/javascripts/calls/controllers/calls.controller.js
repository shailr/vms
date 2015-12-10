(function () {
  'use strict';

  angular
    .module('vms.calls.controllers')
    .controller('CallsController', CallsController);

  CallsController.$inject = ['$scope'];

  function CallsController($scope) {
    var vm = this;

    vm.calls = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.calls; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.calls = [];

        for (var i = 0; i < current.length; i++) {
          vm.calls.push(current[i]);
        }
      }
    }
  }
})();
