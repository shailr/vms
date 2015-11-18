(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('StarredApplicantsController', StarredApplicantsController);

  StarredApplicantsController.$inject = ['Authentication', 'Applicants'];

  function StarredApplicantsController(Authentication, Applicants) {
    var vm = this;

    vm.assignee = Authentication.getAuthenticatedAccount();

    vm.applicants = [];

    if (vm.assignee) {
      Applicants.allStarred(vm.assignee.id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        console.log('Success data = ', data.data);
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error while fetching applicants in StarredApplicantsController');
      }
    }
  }
})();
