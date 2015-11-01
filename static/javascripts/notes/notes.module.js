(function () {
  'use strict';

  angular
    .module('vms.notes', [
      'vms.notes.controllers',
      'vms.notes.services',
      'vms.notes.directives'
    ]);

  angular
    .module('vms.notes.controllers', []);

  angular
    .module('vms.notes.directives', ['ngDialog']);

  angular
    .module('vms.notes.services', []);
})();
