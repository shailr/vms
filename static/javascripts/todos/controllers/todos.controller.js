(function () {
  'use strict';

  angular
    .module('vms.todos.controllers')
    .controller('TodosController', TodosController);

  TodosController.$inject = ['$scope'];

  function TodosController($scope) {
    var vm = this;

    vm.todos = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.todos; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.todos = [];

        for (var i = 0; i < current.length; i++) {
          vm.todos.push(current[i]);
        }
      }
    }
  }
})();
