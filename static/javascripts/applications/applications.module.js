(function () {
  'use strict';

  angular
    .module('vms.applications',[
      'vms.applications.directives',
      'vms.applications.controllers',
      'vms.applications.services'
    ]);

  angular
    .module('vms.applications.directives', ['ngDialog']);

  angular
    .module('vms.applications.controllers', []);

  angular
    .module('vms.applications.services', []);
})();
