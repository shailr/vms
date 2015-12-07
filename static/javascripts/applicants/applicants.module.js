(function () {
  'use strict';

  angular
    .module('vms.applicants', [
      'vms.applicants.controllers',
      'vms.applicants.services',
      'vms.applicants.directives'
    ]);

  angular
    .module('vms.applicants.controllers', ['atomic-notify', 'selectionModel']);

  angular
    .module('vms.applicants.directives', ['ngDialog']);

  angular
    .module('vms.applicants.services', []);
})();
