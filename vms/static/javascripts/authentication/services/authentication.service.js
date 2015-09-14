(function () {
  'use strict';

  angular
    .module('vms.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http']

  function Authentication($cookies, $http) {
    var Authentication = {
      register: register
    };

    return Authentication;

    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        password: password,
        email: email
      });
    }
  }
})()
