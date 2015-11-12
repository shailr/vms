(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('UpdateApplicantController', UpdateApplicantController);

  UpdateApplicantController.$inject = ['$routeParams', '$location', 'Applicants'];

  function UpdateApplicantController($routeParams, $location, Applicants) {
    var vm = this,
        id = $routeParams.id,
        app_id = $routeParams.app_id;

    vm.data = undefined;

    vm.update = update;

    activate();

    function activate() {
      Applicants.get(id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.data = data.data;
        vm.data.data = JSON.parse(vm.data.data);
      }

      function applicantGetErrorFn(data, status, headers, config) {
        $location.url('/applications/' + app_id + '/applicants');
        console.log('Error while retrieving applicant in UpdateApplicantController');
      }
    }

    function update() {
      Applicants.update(vm.data)
        .then(updateApplicantSuccessFn, updateApplicantErrorFn);

      function updateApplicantSuccessFn(data, status, headers, config) {
        console.log('The Applicant has been updated');

        $location.url('/applications/' + app_id + '/applicants/' + id);
      }

      function updateApplicantErrorFn(data, status, headers, config) {
        console.log('Error while updating the applicant in UpdateApplicationController');

        $location.url('/applications/' + app_id + '/applicants/' + id);
      }

    }
  }
})();
