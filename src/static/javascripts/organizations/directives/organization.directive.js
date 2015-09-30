(function () {
  'use strict';

  angular
    .module('vms.organizations.directives')
    .directive('organization', organization);

  function organization() {
    var directive = {
      restrict: 'E',
      scope: {
        organizaion: '='
      },
      templateUrl: '/static/templates/organizations/organization.html'
    };

    return directive;
  }
})();
