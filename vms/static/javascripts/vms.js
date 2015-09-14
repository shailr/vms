(function () {
  'use strict';

  angular
    .module('vms', [
      'vms.routes',
      'vms.authentication',
      'vms.config'
    ]);

  angular
    .module('vms.routes', ['ngRoute']);

  angular
    .module('vms.config', []);

})();
