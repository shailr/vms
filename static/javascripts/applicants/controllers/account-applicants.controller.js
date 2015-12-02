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

    vm.stages = {};

    vm.total = 0;

    vm.assignee = Authentication.getAuthenticatedAccount();

    if (vm.assignee) {
      Applicants.allForAccount(vm.assignee.id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        for (var applicant in vm.applicants) {
          Applicants.get(vm.applicants[applicant].id)
            .then(applicantGetSuccessFn, applicantGetErrorFn);

          function applicantGetSuccessFn(data, status, headers, config) {
            applicant = data.data;

            if (!vm.stages[applicant.stage.name]) {
              vm.stages[applicant.stage.name] = {};
              vm.stages[applicant.stage.name].count = 0;
              vm.stages[applicant.stage.name].id = applicant.stage.id;
            }
            vm.stages[applicant.stage.name].count++;
            vm.total++;
          }

          function applicantGetErrorFn(data, status, headers, config) {
            console.log('Error while getting applicant');
          }
        }
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error while fetching applicants in AccoutApplicantsListController');
      }
    }
  }
})();
