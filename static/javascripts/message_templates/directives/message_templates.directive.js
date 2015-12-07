(function () {
  'use strict';

  angular
    .module('vms.message_templates.directives')
    .directive('templates', templates);

  function templates() {
    var directive = {
      controller: 'MessageTemplatesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        templates: '='
      },
      templateUrl: '/static/templates/message_templates/message_templates.html'
    };

    return directive;
  }
})();
