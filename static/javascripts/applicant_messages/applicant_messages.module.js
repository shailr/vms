(function () {
  'use strict';

  angular
    .module('vms.applicant_messages', [
      'vms.applicant_messages.directives',
      'vms.applicant_messages.services',
      'vms.applicant_messages.controllers'
    ]);

  angular
    .module('vms.applicant_messages.directives', ['ngDialog']);

  angular
    .module('vms.applicant_messages.controllers', []);

  angular
    .module('vms.applicant_messages.services', []);
})();
