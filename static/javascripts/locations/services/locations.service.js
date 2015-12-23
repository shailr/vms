(function () {
  'use strict';

  angular
    .module('vms.locations.services')
    .factory('Locations', Locations);

  Locations.$inject = ['$http'];

  function Locations($http) {
    var Locations = {
      all: all,
      like: like
    };

    return Locations;

    function all() {
      return $http.get('/api/v1/locations/');
    }

    function like(search_text) {
      return $http.get('/api/v1/locations/search/?search=' + search_text);
    }
  }
})();
