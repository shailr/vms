(function () {
  'use strict';

  angular
    .module('vms.applicants.directives')
    .directive('applicant', applicant);

  function applicant() {
    var directive = {
      restrict: 'E',
      scope: {
        applicant: '='
      },
      templateUrl: '/static/templates/applicants/applicant.html'
    };

    return directive;
  }
})();
