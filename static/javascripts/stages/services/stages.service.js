(function () {
  'use strict';

  angular
    .module('vms.stages.services')
    .factory('Stages', Stages);

  Stages.$inject = ['$http', 'Applications'];

  function Stages($http, Applications) {
    var Stages = {
      all: all,
      create: create,
      get: get
    };

    return Stages;

    function all(id) {
      return $http.get('/api/v1/applications/' + id + '/stages/');
    }

    function create(application, name) {
      return $http.post('/api/v1/stages/', {
        application: application,
        name: name
      });
    }

    function get(id) {
      return $http.get('/api/v1/stages/' + id + '/');
    }
  }
})();
