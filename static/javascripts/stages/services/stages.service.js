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
      get: get,
      allAcrossApplications: allAcrossApplications,
      update: update
    };

    return Stages;

    function allAcrossApplications() {
      return $http.get('/api/v1/stages/');
    }

    function all(id) {
      return $http.get('/api/v1/applications/' + id + '/stages/');
    }

    function create(application, name, assignee) {
      return $http.post('/api/v1/stages/', {
        application: application,
        name: name,
        assignee: assignee
      });
    }

    function update(stage) {
      return $http.put('/api/v1/stages/' + stage.id + '/', stage);
    }

    function get(id) {
      return $http.get('/api/v1/stages/' + id + '/');
    }
  }
})();
