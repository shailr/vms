(function () {
  'use strict';

  angular
    .module('vms.applicant_messages', [
      'vms.applicant_messages.services',
      'vms.applicant_messages.controllers',
      'vms.applicant_messages.directives'
    ]);

  angular
    .module('vms.applicant_messages.services', []);

  angular
    .module('vms.applicant_messages.controllers', []);

  angular
    .module('vms.applicant_messages.directives', ['ngDialog']);
})();
