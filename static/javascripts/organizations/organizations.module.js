(function () {
  'use strict';

  angular
    .module('vms.organizations', [
      'vms.organizations.controllers',
      'vms.organizations.services',
      'vms.organizations.directives'
    ]);

  angular
    .module('vms.organizations.controllers', []);

  angular
    .module('vms.organizations.services', []);

  angular
    .module('vms.organizations.directives', ['ngDialog']);
})();
