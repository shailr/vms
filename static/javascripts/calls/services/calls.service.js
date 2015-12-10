(function () {
  'use strict';

  angular
    .module('vms.calls.services')
    .factory('Calls', Calls);

  Calls.$inject = ['$http'];

  function Calls($http) {
    var Calls = {
      all: all,
      create: create,
      update: update
    };

    return Calls;

    function all(id) {
      return $http.get('/api/v1/applicants/' + id + '/calls/');
    }

    function create(applicant, rating) {
      return $http.post('/api/v1/calls/', {
        applicant: applicant,
        rating: rating
      });
    }

    function update(call) {
      return $http.put('/api/v1/calls/' + call.id + '/', call);
    }
  }
})();
