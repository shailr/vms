(function () {
  'use strict';

  angular
    .module('vms.organizations.services')
    .factory('Organizations', Organizations);

  Organizations.$inject = ['$http'];

  function Organizations($http) {
    var Organizations= {
      all: all,
      create: create
    };

    return Organizations;

    function all() {
      console.log('Inside org services get all method');
      return $http.get('/api/v1/organizations/');
    }

    function create(name, phone, location) {
      return $http.post('/api/v1/organizations/', {
        name: name,
        phone: phone,
        location: location
      });
    }
  }
})();
