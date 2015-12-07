(function () {
  'use strict';

  angular
    .module('vms.stages', [
      'vms.stages.controllers',
      'vms.stages.services',
      'vms.stages.directives'
    ]);

  angular
    .module('vms.stages.services', []);

  angular
    .module('vms.stages.controllers', []);

  angular
    .module('vms.stages.directives', ['ngDialog']);
})();
