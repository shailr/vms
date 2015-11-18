(function () {
  'use strict';

  angular
    .module('vms.applicants.services')
    .factory('Applicants', Applicants);

  function Applicants($http, Applications) {
    var Applicants = {
      all: all,
      allFromStage: allFromStage,
      allFromTag: allFromTag,
      allForAccount: allForAccount,
      allStarred: allStarred,
      allArchived: allArchived,
      create: create,
      get: get,
      update: update,
      toggleStar: toggleStar,
      archive: archive
    };

    return Applicants;

    function allArchived(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/archived/');
    }

    function allStarred(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/starred/');
    }

    function all(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/');
    }

    function allFromStage(id) {
      return $http.get('/api/v1/stages/' + id + '/applicants/');
    }

    function allFromTag(id) {
      return $http.get('/api/v1/tags/' + id + '/applicants/');
    }

    function allForAccount(id) {
      return $http.get('/api/v1/accounts/' + id + '/applicants/');
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

    function toggleStar(applicant) {
      return $http.put('/api/v1/applicants/' + applicant.id + '/', applicant);
    }

    function archive(applicant) {
      return $http.put('/api/v1/applicants/' + applicant.id + '/', applicant);
    }

    function get(id) {
      return $http.get('/api/v1/applicants/' + id + '/');
    }
  }
})();
