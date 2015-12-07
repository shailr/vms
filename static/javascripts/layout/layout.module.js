(function () {
  'use strict';

  angular
    .module('vms.layout', [
      'vms.layout.controllers',
      'chart.js'
    ]);

  angular
    .module('vms.layout.controllers', ['vms.organizations.services', 'chart.js']);
})();
