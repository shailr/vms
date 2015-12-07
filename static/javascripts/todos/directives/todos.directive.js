(function () {
  'use strict';

  angular
    .module('vms.todos.directives')
    .directive('todos', todos);

  function todos() {
    var directive = {
      controller: 'TodosController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        todos: '='
      },
      templateUrl: '/static/templates/todos/todos.html'
    };

    return directive;
  }
})();
