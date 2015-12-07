(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.directives')
    .directive('messages', messages);

  function messages() {
    var directive = {
      controller: 'ApplicantMessagesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        messages: '='
      },
      templateUrl: '/static/templates/applicant_messages/applicant_messages.html'
    };

    return directive;
  }
})();
