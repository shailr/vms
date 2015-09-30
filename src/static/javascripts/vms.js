angular
  .module('vms', [
    'vms.routes',
    'vms.authentication',
    'vms.config',
    'vms.layout',
    'vms.organizations'
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
}
