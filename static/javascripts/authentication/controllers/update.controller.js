(function () {
  'use strict';

  angular
    .module('vms.authentication.controllers')
    .controller('UpdateAccountController', UpdateAccountController);

  function UpdateAccountController($location, Authentication) {
    var vm = this;

    vm.account = undefined;

    vm.update = update;

    activate();

    function activate() {
      vm.account = Authentication.getAuthenticatedAccount();

      if (!vm.account) {
        console.log('Error while fetching the account in UpdateAccountController. Redirecting to login page');

        $locaiton.url('/login');
      }
    }

    function update() {
      Authentication.update(vm.account)
        .then(updateAccountSuccessFn, updateAccountErrorFn);

      function updateAccountSuccessFn(data, status, headers, config) {
        console.log('The account has been updated successfully.');

        $location.url('/settings');
      }

      function updateAccountErrorFn(data, status, headers, config) {
        console.log('Error while updating account in UpdateAccountController');

        $location.url('/settings');
      }
    }
  }
})();
