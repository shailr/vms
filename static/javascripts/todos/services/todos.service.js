(function () {
  'use strict';

  angular
    .module('vms.todos.services')
    .factory('Todos', Todos);

  Todos.$inject = ['$http'];

  function Todos($http) {
    var Todos = {
      all: all,
      create: create
    };

    return Todos;

    function all(id) {
      return $http.get('/api/v1/applicants/' + id + '/todos/');
    }

    function create(applicant, todo, assignee) {
      return $http.post('/api/v1/todos/', {
        applicant: applicant,
        todo: todo,
        assignee: assignee
      });
    }
  }
})();
