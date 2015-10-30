(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.directives')
    .directive('applicant_messages', applicant_messages);

  function applicant_messages() {
    var directive = {
      controller: 'ApplicantMessagesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        applicant_messges: '='
      },
      templateUrl: '/static/templates/applicant_messages/applicant_messages.html'
    };

    return directive;
  }
})();
