(function () {
  'use strict';

  angular
    .module('vms.notes.services')
    .factory('Notes', Notes);

  Notes.$inject = ['$http'];

  function Notes($http) {
    var Notes = {
      all: all,
      create: create
    };

    return Notes;

    function all(id) {
      return $http.get('/api/v1/applicants/' + id + '/notes/');
    }

    function create(applicant, note) {
      return $http.post('/api/v1/notes/', {
        applicant: applicant,
        note: note
      });
    }
  }
})();
