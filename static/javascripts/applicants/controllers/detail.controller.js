(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', '$scope', 'Applicants'];

  function ApplicantDetailController($location, $routeParams, $scope, Applicants) {
    var vm = this;

    vm.applicant = undefined;

    activate();

    function activate() {
      var id = $routeParams.id;

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        // TODO: Add the following things:

        // vm.applicant_messages = [];
        // vm.notes = [];
        // vm.todos = [];
        // vm.grievances = [];
        // vm.history = [];
      }

      function applicantDetailErrorFn(data, status, headers, config) {
        $location.url('/applications/');
        console.log('MASSIVE THROBBBING ERROR IN APPLCIANT DETAILS CONTROLLER');
      }
    }
  }
})();
