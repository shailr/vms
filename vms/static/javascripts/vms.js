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

angular
  .module('vms')
  .run(run)

function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
