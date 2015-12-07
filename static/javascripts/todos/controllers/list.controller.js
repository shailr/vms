(function () {
  'use strict';

  angular
    .module('vms.todos.controllers')
    .controller('TodosListController', TodosListController);

  TodosListController.$inject = ['Todos', 'Authentication'];

  function TodosListController(Todos, Authentication) {
    var vm = this;

    vm.todos = [];

    vm.assignee = undefined;

    activate();

    function activate() {
      vm.assignee = Authentication.getAuthenticatedAccount();

      Todos.allForAccount(vm.assignee.id)
        .then(todosGetSuccessFn, todosGetErrorFn);

      function todosGetSuccessFn(data, status, headers, config) {
        vm.todos = data.data;

        console.log(vm.todos);
      }

      function todosGetErrorFn(data, status, headers, config) {
        console.log('Error in TodosListController while fetching todos for an account');
      }
    }
  }
})();
