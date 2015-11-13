(function () {
  'use strict';

  angular
    .module('vms.todos.directives')
    .directive('todo', todo);

  function todo() {
    var directive = {
      restrict: 'E',
      scope: {
        todo: '='
      },
      templateUrl: '/static/templates/todos/todo.html'
    };

    return directive;
  }
})();
