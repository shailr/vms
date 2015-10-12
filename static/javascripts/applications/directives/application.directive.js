(function () {
  'use strict';

  angular
    .module('vms.applications.directives')
    .directive('application', application);

  function application() {
    var directive = {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/applications/application.html'
    };

    return directive;
  }
})();
