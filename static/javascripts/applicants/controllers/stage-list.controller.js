(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('StageApplicantsListController', StageApplicantListController);

  StageApplicantListController.$inject = ['$routeParams', 'Applicants', 'Stages'];

  function StageApplicantListController($routeParams, Applicants, Stages) {
    var vm = this;

    vm.applicants = [];

    vm.id = $routeParams.id;

    vm.stages = [];

    activate();

    function activate() {
      var id = $routeParams.stage_id;

      Stages.all(vm.id)
        .then(stagesGetSuccessFn, stagesGetErrorFn);

      function stagesGetSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
      }

      function stagesGetErrorFn(data, status, headers, config) {
        console.log('Error while fetching stages in ApplicantListController');
      }


      Applicants.allFromStage(id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant Get Function in StageApplicantListController');
      }
    }
  }
})();
