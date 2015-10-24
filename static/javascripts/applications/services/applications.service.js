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
      get: get,
      overview: overview
    };

    return Applications;

    function overview() {
      return $http.get('/api/v1/applications/overview/')
    }

    function all() {
      return $http.get('/api/v1/applications/');
    }

    function create(title, details) {
      return $http.post('/api/v1/applications/', {
        title: title,
        details: details
      });
    }

    function get(id) {
      return $http.get('/api/v1/applications/' + id + '/');
    }
  }
})();
