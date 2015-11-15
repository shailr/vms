(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('TagApplicantsListController', TagApplicantsListController);

  TagApplicantsListController.$inject = ['$location', '$routeParams', 'Applicants', 'Tags'];

  function TagApplicantsListController($location, $routeParams, Applicants, Tags) {
    var vm = this;

    vm.applicants = [];

    vm.tag_id = $routeParams.tag_id;

    Applicants.allFromTag(vm.tag_id)
      .then(applicantListSuccessFn, applicantListErrorFn);

    function applicantListSuccessFn(data, status, headers, config) {
      vm.applicants = data.data;
    }

    function applicantListErrorFn(data, status, headers, config) {
      console.log('Error in Applicant get function in TagApplicantListController');
    }
  }
})();
