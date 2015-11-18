(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('AccountApplicantsListController', AccountApplicantsListController);

  AccountApplicantsListController.$inject = ['Authentication', 'Applicants'];

  function AccountApplicantsListController(Authentication, Applicants) {
    var vm = this;

    vm.assignee = undefined;

    vm.applicants = [];

    vm.assignee = Authentication.getAuthenticatedAccount();

    if (vm.assignee) {
      console.log('Correct till here');

      Applicants.allForAccount(vm.assignee.id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        console.log('SUccess data= ', data.data);
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error while fetching applicants in AccoutApplicantsListController');
      }
    }
  }
})();
