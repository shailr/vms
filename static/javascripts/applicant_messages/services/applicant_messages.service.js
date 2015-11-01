(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.services')
    .factory('ApplicantMessages', ApplicantMessages);

  ApplicantMessages.$inject = ['$http', 'Applicants'];

  function ApplicantMessages($http, Applicants) {
    var ApplicantMessages = {
      all: all,
      create: create,
      get: get
    };

    return ApplicantMessages;

    function all(id) {
      return $http.get('/api/v1/applicants/' + id + '/applicant_messages/');
    }

    function create(applicant, message) {
      return $http.post('/api/v1/applicant_messages/', {
        applicant: applicant,
        message: message
      });
    }

    function get(id) {
      return $http.get('/api/v1/applicant_messages/' + id + '/');
    }
  }
})();
