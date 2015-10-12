(function () {
  'use strict';

  angular
    .module('vms.organizations.directives')
    .directive('organizations', organizations);

  function organizations() {
    var directive = {
      controller: 'OrganizationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        organizations: '='
      },
      templateUrl: '/static/templates/organizations/organizations.html'
    };

    return directive;
  }
})();
