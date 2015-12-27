(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('AccountApplicantsListController', AccountApplicantsListController);

  AccountApplicantsListController.$inject = ['$location', 'Authentication', 'Applicants', 'Stages'];

  function AccountApplicantsListController($location, Authentication, Applicants, Stages) {
    var vm = this;

    vm.assignee = undefined;

    vm.applicants = [];

    vm.stages = {};

    vm.stage_list = [];

    vm.total = 0;

    vm.assignee = Authentication.getAuthenticatedAccount();

    vm.stage_names = {
      "1": "Incoming",
      "2": "Calling",
      "3": "Eligible - documentation",
      "4": "Eligible - Application",
      "5": "Admitted",
      "6": "Ineligible applicant",
      "7": "Call Done - Not responsding",
      "8": "Call Done - Call cut",
      "9": "Call Done - Volunteer/NGO",
      "10": "EWS Last Year",
      "11": "Wrong no - No child",
      "12": "Wrong no - Did not call",
      "13": "Call Done - Switched off",
      "14": "Call Done - Not reachable",
      "15": "Call Done - Busy",
      "16": "Community Champ"
    };

    if (vm.assignee) {
      vm.page = 1;

      var page = $location.url();

      if (page.indexOf('=') > -1) {
        page = page.substr(page.indexOf("=") + 1);
        vm.page = page;
      }

      Applicants.allForAccount(vm.assignee.id, vm.page)
        .then(applicantListSuccessFn, applicantListErrorFn);

      Stages.allAcrossApplications()
        .then(stageListGetSuccessFn, stageListGetErrorFn);

      function stageListGetSuccessFn(data, status, headers, config) {
        vm.stage_list = data.data;
      }

      function stageListGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stages in AccountApplicantsController');
      }

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        vm.total = vm.applicants.count;

        if (vm.applicants.previous) {
          vm.applicants.previous = vm.applicants.previous.replace(/\/api\/v1\/accounts\/\d+/, '');
          vm.applicants.previous = vm.applicants.previous.replace('/?', '?');
        }

        if (vm.applicants.next) {
          vm.applicants.next = vm.applicants.next.replace(/\/api\/v1\/accounts\/\d+/, '');
          vm.applicants.next = vm.applicants.next.replace('/?', '?');
        }
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error while fetching applicants in AccoutApplicantsListController');
      }
    }
  }
})();

        // for (var applicant in vm.applicants) {
        //   Applicants.get(vm.applicants[applicant].id)
        //     .then(applicantGetSuccessFn, applicantGetErrorFn);

        //   function applicantGetSuccessFn(data, status, headers, config) {
        //     applicant = data.data;

        //     if (!vm.stages[applicant.stage.name]) {
        //       vm.stages[applicant.stage.name] = {};
        //       vm.stages[applicant.stage.name].count = 0;
        //       vm.stages[applicant.stage.name].id = applicant.stage.id;
        //     }
        //     vm.stages[applicant.stage.name].count++;
        //     vm.total++;
        //   }

        //   function applicantGetErrorFn(data, status, headers, config) {
        //     console.log('Error while getting applicant');
        //   }
        // }
