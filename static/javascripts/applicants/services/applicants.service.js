(function () {
  'use strict';

  angular
    .module('vms.applicants.services')
    .factory('Applicants', Applicants);

  function Applicants($http, Applications) {
    var Applicants = {
      all: all,
      allFromStage: allFromStage,
      create: create,
      get: get,
      update: update
    };

    return Applicants;

    function all(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/');
    }

    function allFromStage(id) {
      return $http.get('/api/v1/stages/' + id + '/applicants/');
    }

    function create(application, data) {
      return $http.post('/api/v1/applicants/', {
        application: application,
        mobile: data.mobile,
        data: JSON.stringify(data)
      });
    }

    function update(applicant) {
      applicant.data = JSON.stringify(applicant.data);

      return $http.put('/api/v1/applicants/' + applicant.id + '/', applicant);
    }

    function get(id) {
      return $http.get('/api/v1/applicants/' + id + '/');
    }
  }
})();
