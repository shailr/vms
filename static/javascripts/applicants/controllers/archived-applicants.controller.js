(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ArchivedApplicantsController', ArchivedApplicantsController);

  ArchivedApplicantsController.$inject = ['Authentication', 'Applicants'];

  function ArchivedApplicantsController(Authentication, Applicants) {
    var vm = this;

    vm.assignee = Authentication.getAuthenticatedAccount();

    vm.applicants = [];

    if (vm.assignee) {
      Applicants.allArchived(vm.assignee.id)
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
