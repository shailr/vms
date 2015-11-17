(function () {
  'use strict';

  angular
    .module('vms.message_templates.directives')
    .directive('message_templates', message_templates);

  function message_templates() {
    var directive = {
      controller: 'MessageTemplatesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        message_templates: '='
      },
      templateUrl: '/static/templates/message_templates/message_templates.html'
    };

    return directive;
  }
})();
