(function () {
  'use strict';

  angular
    .module('vms.todos.controllers')
    .controller('TodosController', TodosController);

  TodosController.$inject = ['$scope', 'Todos'];

  function TodosController($scope, Todos) {
    var vm = this;

    vm.todos = [];

    vm.toggleDone = toggleDone;

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

    function toggleDone(todo) {
      todo.done = !todo.done;

      Todos.update(todo)
        .then(toggleDoneSuccessFn, toggleDoneErrorFn);

      function toggleDoneSuccessFn(data, status, headers, config) {
        console.log('Congrats on getting it done');
      }

      function toggleDoneErrorFn(data, status, headers, config) {
        console.log('Error in toggleDone function in TodosController');
      }
    }
  }
})();
