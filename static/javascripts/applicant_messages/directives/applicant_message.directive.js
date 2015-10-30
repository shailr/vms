(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.directives')
    .directive('applicant_message', applicant_message);

  function applicant_message() {
    var directive = {
      restrict: 'E',
      scope: {
        applicant_message: '='
      },
      templateUrl: '/static/templates/applicant_messages/applicant_message.html'
    };

    return directive;
  }
})();
