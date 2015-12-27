(function () {
  'use strict';

  angular
    .module('vms.authentication', [
      'vms.authentication.controllers',
      'vms.authentication.services',
      'ngStorage'
    ]);

  angular
    .module('vms.authentication.controllers', []);

  angular
    .module('vms.authentication.services', ['ngCookies']);
})();
