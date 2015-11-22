(function () {
  'use strict';

  angular
    .module('vms.message_templates.directives')
    .directive('templatej', templatej);

  function templatej() {
    var directive = {
      restrict: 'E',
      scope: {
        templatej: '='
      },
      templateUrl: '/static/templates/message_templates/message_template.html'
    };

    return directive;
  }
})();
