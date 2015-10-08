(function () {
  'use strict';

  angular
    .module('vms.applications.directives')
    .directive('applications', applications);

  function applications() {
    var directive = {
      controller: 'ApplicationController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        applications: '='
      },
      templateUrl: '/static/templates/applications/applications.html'
    };

    return directive;
  }
})();
