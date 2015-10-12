(function () {
  'use strict';

  angular
    .module('vms.applications.services')
    .factory('Applications', Applications);

  Applications.$inject = ['$http'];

  function Applications($http) {
    var Applications = {
      all: all,
      create: create,
      get: get
    };

    return Applications;

    function all() {
      return $http.get('/api/v1/applications/');
    }

    function create(title, details) {
      return $http.post('/api/v1/applications/', {
        title: title,
        details: details
      });
    }

    function get(organization) {
      return $http.get('/api/v1/organizations/' + organization + '/applications/');
    }
  }
})();
