(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('StageApplicantsListController', StageApplicantListController);

  StageApplicantListController.$inject = ['$location', '$routeParams', 'Applicants', 'Stages'];

  function StageApplicantListController($location, $routeParams, Applicants, Stages) {
    var vm = this;

    vm.applicants = [];

    vm.id = $routeParams.id;

    vm.stages = [];

    vm.page = 1;

    activate();

    function activate() {
      var id = $routeParams.stage_id,
          page = $location.url();

      if (page.indexOf('=') > -1) {
        page = page.substr(page.indexOf("=") + 1);
        vm.page = page;
      }

      Stages.all(vm.id)
        .then(stagesGetSuccessFn, stagesGetErrorFn);

      function stagesGetSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
      }

      function stagesGetErrorFn(data, status, headers, config) {
        console.log('Error while fetching stages in ApplicantListController');
      }


      Applicants.allFromStage(id, vm.page)
        .then(applicantListSuccessFn, applicantListErrorFn);

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;

        if (vm.applicants.previous) {
          vm.applicants.previous = vm.applicants.previous.replace('api/v1/', 'applications/1/');
          vm.applicants.previous = vm.applicants.previous.replace('/?', '?');
          vm.applicants.previous = vm.applicants.previous.replace('127.0.0.1:8000', '52.26.182.226');

          console.log(vm.applicants.previous);
        }

        if (vm.applicants.next) {
          vm.applicants.next = vm.applicants.next.replace('api/v1/', 'applications/1/');
          vm.applicants.next = vm.applicants.next.replace('/?', '?');
          vm.applicants.next = vm.applicants.next.replace('127.0.0.1:8000', '52.26.182.226');
          console.log(vm.applicants.next);
        }
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant Get Function in StageApplicantListController');
      }
    }
  }
})();
