(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('MultipleAssignmentController', MultipleAssignmentController);

  MultipleAssignmentController.$inject = ['History', '$location', '$rootScope', 'Authentication', 'Applicants'];

  function MultipleAssignmentController(History, $location, $rootScope, Authentication, Applicants) {
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
      var count = 0;

      for (var applicant in vm.selected_applicants_for_multiple_assignment) {
        var current = vm.selected_applicants_for_multiple_assignment[applicant];

        current.assignee =  vm.assignee;

        if (typeof current.data === "string") {
          current.data = JSON.parse(current.data);
	}

        if (typeof current.query === "string") {
          current.query = JSON.parse(current.query);
	}

        if (typeof current.info === "string") {
          current.info = JSON.parse(current.info);
	}


        Applicants.update(current)
          .then(updateApplicantSuccessFn, updateApplicantErrorFn);

        function updateApplicantSuccessFn(data, status, headers, config) {
          History.create(current, 'Applicant was reassigned to ' + vm.assignee.first_name);

          if (++count == vm.selected_applicants_for_multiple_assignment.length) {
            $location.url('/applications/1/applicants/');
          }
        }

        function updateApplicantErrorFn(data, status, headers, config) {
          if (++count == vm.selected_applicants_for_multiple_assignment.length) {
            $location.url('/applications/1/applicants/');
          }

          console.log('Error while updating applicant in MultipleAssignmentController');
        }
      }
    }
  }
})();
