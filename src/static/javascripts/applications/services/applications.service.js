(function () {
  'use strict';

  angular
    .module('vms.applications.services')
    .factory('Applications', Applications);

  Applications.$inject = ['$http'];

  function Applications($http) {
    var Application = {
      all: all,
      create: create,
      get: get
    };

    return Applications;

    function all() {
      return $http.get('/ap1/v1/applications/');
    }

    function create(title) {
      return $http.post('/api/v1/applications/', {
        title: title
      });
    }

    function get(organization) {
      return $http.get('/api/v1/organizations/' + organization + '/applications/');
    }
  }
})();
