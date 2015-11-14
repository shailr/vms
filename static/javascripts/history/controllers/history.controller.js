(function () {
  'use strict';

  angular
    .module('vms.history.controllers')
    .controller('HistoryController', HistoryController);

  HistoryController.$inject = ['$scope'];

  function HistoryController($scope) {
    var vm = this;

    vm.histories = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.histories; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.histories = [];

        for (var i = 0; i < current.length; i++) {
          vm.histories.push(current[i]);
        }
      }
    }
  }
})();
