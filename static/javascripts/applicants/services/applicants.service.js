(function () {
  'use strict';

  angular
    .module('vms.applicants.services')
    .factory('Applicants', Applicants);

  Applicants.$inject = ['$http', 'Applications', 'ApplicantMessages'];

  function Applicants($http, Applications, ApplicantMessages) {
    var Applicants = {
      all: all,
      allFromStage: allFromStage,
      allFromTag: allFromTag,
      allForAccount: allForAccount,
      allForAccountWithoutPagination: allForAccountWithoutPagination,
      allFromStageForAccount: allFromStageForAccount,
      allFromStageForAccountWithoutPagination: allFromStageForAccountWithoutPagination,
      allStarred: allStarred,
      allArchived: allArchived,
      create: create,
      get: get,
      like: like,
      update: update,
      toggleStar: toggleStar,
      archive: archive,
      allStarredAcrossApplications: allStarredAcrossApplications,
      sendMessageToMultipleApplicants: sendMessageToMultipleApplicants
    };

    return Applicants;

    function sendMessageToMultipleApplicants(applicants, message) {
      for (var applicant in applicants) {
        ApplicantMessages.create(applicants[applicant], message);
      }
    }

    function allArchived(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/archived/');
    }

    function allStarred(id) {
      return $http.get('/api/v1/applications/' + id + '/applicants/starred/');
    }

    function allStarredAcrossApplications() {
      return $http.get('/api/v1/applicants/starred/');
    }

    function all(id, page) {
      return $http.get('/api/v1/applications/' + id + '/applicants/?page=' + page);
    }

    function allFromStage(id, page) {
      return $http.get('/api/v1/stages/' + id + '/applicants/?page=' +  page);
    }

    function allFromTag(id, page) {
      return $http.get('/api/v1/tags/' + id + '/applicants/?page=' + page);
    }

    function allForAccount(id, page) {
      return $http.get('/api/v1/accounts/' + id + '/applicants/?page=' + page);
    }

    function allForAccountWithoutPagination(id) {
      return $http.get('/api/v1/accounts/' + id + '/applicants/nopage/');
    }

    function allFromStageForAccount(id, stage_id, page) {
      return $http.get('/api/v1/accounts/' + id + '/applicants/stage/?stage=' + stage_id + '&page=' + page);
    }

    function allFromStageForAccountWithoutPagination(id, stage_id) {
      return $http.get('/api/v1/accounts/' + id + '/applicants/stagenopage/?stage=' + stage_id);
    }

    function create(application, data, query, info) {
      return $http.post('/api/v1/applicants/', {
        application: application,
        mobile: data.mobile,
        data: JSON.stringify(data),
        query: JSON.stringify(query),
        info: JSON.stringify(info)
      });
    }

    function like(search_text) {
      return $http.get('/api/v1/applicants/search/?search=' + search_text);
    }

    function update(applicant) {
      applicant.data = JSON.stringify(applicant.data);
      applicant.query = JSON.stringify(applicant.query);
      applicant.info = JSON.stringify(applicant.info);

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
