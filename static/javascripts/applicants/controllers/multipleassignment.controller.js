(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('MultipleAssignmentController', MultipleAssignmentController);

  MultipleAssignmentController.$inject = ['$location', '$rootScope', 'Authentication', 'Applicants'];

  function MultipleAssignmentController($location, $rootScope, Authentication, Applicants) {
    var vm = this;

    vm.assignee = undefined;
    vm.changeAssignee = changeAssignee;
    vm.selected_applicants_for_multiple_assignment = $rootScope.selected_items;
    vm.accounts = [];

    Authentication.all()
      .then(accountsGetSuccessFn, accountsGetErrorFn);

    function accountsGetSuccessFn(data, status, headers, config) {
      vm.accounts = data.data.results;
    }

    function accountsGetErrorFn(data, status, headers, config) {
      console.log('Error while getting accounts in MultipleMessagesController');
    }

    function changeAssignee() {
      console.log(vm.assignee);

      Authentication.get(vm.assignee)
        .then(accountGetSuccessFn, accountGetErrorFn);

      function accountGetSuccessFn(data, status, headers, config) {
        var count = 0;

        for (var applicant in vm.selected_applicants_for_multiple_assignment) {
          var current = vm.selected_applicants_for_multiple_assignment[applicant];

          current.assignee =  vm.assignee;

          Applicants.update(current)
            .then(updateApplicantSuccessFn, updateApplicantErrorFn);

          function updateApplicantSuccessFn(data, status, headers, config) {
            if (++count == vm.selected_applicants_for_multiple_assignment.length) {
              $location.url('/applications/1/applicants/');
            }
          }

          function updateApplicantErrorFn(data, status, headers, config) {
            if (++count == vm.selected_applicants_for_multiple_assignment.length) {
              $location.url('/applications/1/applicants/');
            }

            console.log('Error in create message in MultipleMessagesController');
          }
        }
      }

      function accountGetErrorFn(data, status, headers, config) {
        console.log('Error while getting the acccount in MultipleAssignmentController');

        $location.url('/applications/1/applicants');
      }
    }
  }
})();
