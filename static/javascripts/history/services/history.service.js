(function () {
  'use strict';

  angular
    .module('vms.history.services')
    .factory('History', History);

  History.$inject = ['$http'];

  function History($http) {
    var History = {
      all: all,
      create: create
    };

    return History;

    function all(id) {
      return $http.get('/api/v1/applicants/' + id + '/history/');
    }

    function create(applicant, message) {
      return $http.post('/api/v1/history/', {
        applicant: applicant,
        message: message
      });
    }
  }
})();
