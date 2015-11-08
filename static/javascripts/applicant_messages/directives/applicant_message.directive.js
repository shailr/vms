(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.directives')
    .directive('message', message);

  function message() {
    var directive = {
      restrict: 'E',
      scope: {
        message: '='
      },
      templateUrl: '/static/templates/applicant_messages/applicant_message.html'
    };

    return directive;
  }
})();
