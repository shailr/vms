(function () {
  'use strict';

  angular
    .module('vms.todos.services')
    .factory('Todos', Todos);

  Todos.$inject = ['$http'];

  function Todos($http) {
    var Todos = {
      all: all,
      create: create,
      get: get,
      update: update,
      allForAccount: allForAccount,
      allCreatedByAccount: allCreatedByAccount
    };

    return Todos;

    function allForAccount(id) {
      return $http.get('/api/v1/accounts/' + id + '/todos/');
    }

    function allCreatedByAccount(id) {
      return $http.get('/api/v1/accounts/' + id + '/todos/created/');
    }

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

    function get(id) {
      return $http.get('/api/v1/todos/' + id + '/');
    }

    function update(todo) {
      return $http.put('/api/v1/todos/' + todo.id + '/', todo);
    }
  }
})();
