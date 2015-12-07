(function () {
  'use strict';

  angular
    .module('vms.authentication', [
      'vms.authentication.controllers',
      'vms.authentication.services'
    ]);

  angular
    .module('vms.authentication.controllers', []);

  angular
    .module('vms.authentication.services', ['ngCookies']);
})();
