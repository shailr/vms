(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope'];

  function NotesController($scope) {
    var vm = this;

    vm.notes = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.notes; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.notes = [];

        for (var i = 0; i < current.length; i++) {
          vm.notes.push(current[i]);
        }
      }
    }
  }
})();
