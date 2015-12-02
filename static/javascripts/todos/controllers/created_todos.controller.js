(function () {
  'use strict';

  angular
    .module('vms.todos.controllers')
    .controller('CreatedTodosController', CreatedTodosController);

  CreatedTodosController.$inject = ['Todos', 'Authentication'];

  function CreatedTodosController(Todos, Authentication) {
    var vm = this;

    vm.todos = [];

    vm.creator = undefined;

    activate();

    function activate() {
      vm.assignee = Authentication.getAuthenticatedAccount();

      Todos.allCreatedByAccount(vm.creator.id)
        .then(todosGetSuccessFn, todosGetErrorFn);

      function todosGetSuccessFn(data, status, headers, config) {
        vm.todos = data.data;

        console.log('todos = ', data.data);
      }

      function todosGetErrorFn(data, status, headers, config) {
        console.log('Error while getting todos in CreatedTodosController');
      }
    }
  }
})();
