(function () {
  'use strict';

  angular
    .module('vms.tags.services')
    .factory('Tags', Tags);

  Tags.$inject = ['$http'];

  function Tags($http) {
    var Tags = {
      allFromApplicant: allFromApplicant,
      create: create
    };

    return Tags;

    function allFromApplicant(id) {
      return $http.get('/api/v1/applicants/' + id + '/tags/');
    }

    function create(applicant, tag) {
      return $http.post('/api/v1/tags/', {
        applicant: applicant,
        tag: tag
      });
    }
  }
})();
