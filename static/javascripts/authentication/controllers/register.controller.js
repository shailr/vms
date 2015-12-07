(function () {
  'use strict';

  angular
    .module('vms.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    vm.data = {};

    activate();

    function activate() {
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    function register() {
      console.log(vm.data);
      Authentication.register(vm.email, vm.password, vm.data);
    }
  }
})();
