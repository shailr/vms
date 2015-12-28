(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('AccountsStageApplicantController', AccountsStageApplicantController);

  AccountsStageApplicantController.$inject = ['Applicants', '$location', 'Authentication', '$routeParams', 'Stages'];

  function AccountsStageApplicantController(Applicants, $location, Authentication, $routeParams, Stages) {
    var vm = this,
        account_id = $routeParams.account_id,
        stage_id = $routeParams.stage_id;

    vm.assignee = Authentication.getAuthenticatedAccount();

    if (vm.assignee) {
      vm.page = 1;

      var page = $location.url();

      if (page.indexOf('=') > -1) {
        var params = page.split('&');

        if (params.length == 2) {
          console.log(params);
          vm.page = params[0].substr(params[0].indexOf("=") + 1);
          stage_id = params[1].substr(params[1].indexOf("=") + 1);

        } else {
          stage_id = params[0].substr(params[0].indexOf("=") + 1);
        }
      }

      Stages.allAcrossApplications()
        .then(stageListGetSuccessFn, stageListGetErrorFn);

      function stageListGetSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
      }

      function stageListGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stages in AccountApplicantsController');
      }

      Applicants.allFromStageForAccount(account_id, stage_id, vm.page)
        .then(applicantsGetSuccessFn, applicantsGetErrorFn);

      function applicantsGetSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        if (vm.applicants.previous) {
          vm.applicants.previous = vm.applicants.previous.replace(/\/api\/v1/, '');
          vm.applicants.previous = vm.applicants.previous.replace('/?', '?');
        }

        if (vm.applicants.next) {
          vm.applicants.next = vm.applicants.next.replace(/\/api\/v1/, '');
          vm.applicants.next = vm.applicants.next.replace('/?', '?');
        }

      }

      function applicantsGetErrorFn(data, status, headers, config) {
        console.log('Error while getting applicants in AccountsStageApplicantController');
      }
    }
  }
})();
