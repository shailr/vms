(function () {
  'use strict';

  angular
    .module('vms.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$localStorage', '$cookies', '$http']

  function Authentication($localStorage, $cookies, $http) {
    var Authentication = {
      register: register,
      login: login,
      logout: logout,
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate,
      all: all,
      get: get,
      update: update
    };

    return Authentication;

    function get(id) {
      return $http.get('/api/v1/accounts/' + id + '/');
    }

    function all() {
      return $http.get('/api/v1/accounts/');
    }

    function register(email, password, data) {
      console.log('data', data);

      return $http.post('/api/v1/accounts/', {
        password: password,
        email: email,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        console.log(data.data);
        Authentication.login(email, password);
      }

      function registerErrorFn() {
        console.log('MASSIVE ERROR');
      }

    }

    function update(account) {
      return $http.put('/api/v1/accounts/' + account.id + '/', account);
    }

    function login(email, password) {
      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }

      function loginErrorFn(data, status, headers, config) {
        console.log('Something seriously went wrong');
      }
    }

    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn() {
        Authentication.unauthenticate();

        window.location = '/';
      }

      function logoutErrorFn() {
        console.log('THIS IS MASSIVE');
      }
    }

    function getAuthenticatedAccount() {
      if (!$cookies.get('authenticatedAccount')) {
        return;
      }

      if ($localStorage.authenticatedAccount) {
        return $localStorage.authenticatedAccount;
      }
    }

    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccount(account) {
      $cookies.put('authenticatedAccount', account.id);

      $localStorage.authenticatedAccount = account;
    }

    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }
  }
})();
