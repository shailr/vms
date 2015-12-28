(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('TagApplicantsListController', TagApplicantsListController);

  TagApplicantsListController.$inject = ['$location', '$routeParams', 'Applicants', 'Tags'];

  function TagApplicantsListController($location, $routeParams, Applicants, Tags) {
    var vm = this;

    vm.applicants = [];

    vm.page = 1;

    vm.tag_id = $routeParams.tag_id;

    var id = $routeParams.stage_id,
        page = $location.url();

    if (page.indexOf('=') > -1) {
      page = page.substr(page.indexOf("=") + 1);
      vm.page = page;
    }

    Applicants.allFromTag(vm.tag_id, vm.page)
      .then(applicantListSuccessFn, applicantListErrorFn);

    function applicantListSuccessFn(data, status, headers, config) {
      vm.applicants = data.data;

      if (vm.applicants.previous) {
        vm.applicants.previous = vm.applicants.previous.replace('api/v1/', 'applications/1/');
        vm.applicants.previous = vm.applicants.previous.replace('/?', '?');
        vm.applicants.previous = vm.applicants.previous.replace('127.0.0.1:8000', '52.26.182.226')
      }

      if (vm.applicants.next) {
        vm.applicants.next = vm.applicants.next.replace('api/v1/', 'applications/1/');
        vm.applicants.next = vm.applicants.next.replace('/?', '?');
        vm.applicants.next = vm.applicants.next.replace('127.0.0.1:8000', '52.26.182.226')
      }

    }

    function applicantListErrorFn(data, status, headers, config) {
      console.log('Error in Applicant get function in TagApplicantListController');
    }
  }
})();
