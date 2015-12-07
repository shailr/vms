(function () {
  'use strict';

  angular
    .module('vms.applicants.directives')
    .directive('applicants', applicants);

  function applicants() {
    var directive = {
      controller: 'ApplicantsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        applicants: '='
      },
      templateUrl: '/static/templates/applicants/applicants.html'
    };

    return directive;
  }
})();
