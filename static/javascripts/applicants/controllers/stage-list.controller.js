(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('StageApplicantsListController', StageApplicantListController);

  StageApplicantListController.$inject = ['$routeParams', 'Applicants'];

  function StageApplicantListController($routeParams, Applicants) {
    var vm = this;

    vm.applicants = [];

    activate();

    function activate() {
      var id = $routeParams.stage_id;

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
