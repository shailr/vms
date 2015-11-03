(function () {
  'use strict';

  angular
    .module('vms.applicants.services')
    .factory('Applicants', Applicants);

  Applicants.$inject = ['$http', 'Applications'];

  function Applicants($http, Applications) {
    var Applicants = {
      all: all,
      create: create,
      get: get
    };

    return Applicants;

    function all(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/');
    }

    function create(application, data) {
      return $http.post('/api/v1/applicants/', {
        application: application,
        mobile: data.mobile
      });
    }

    function get(id) {
      return $http.get('/api/v1/applicants/' + id + '/');
    }
  }
})();
