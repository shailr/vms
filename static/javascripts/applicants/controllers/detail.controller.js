(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', '$scope', 'Applicants', 'Notes'];

  function ApplicantDetailController($location, $routeParams, $scope, Applicants, Notes) {
    var vm = this;

    vm.applicant = undefined;

    activate();

    function activate() {
      var id = $routeParams.id;

      Notes.test();

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        // ApplicantMessages.all(vm.applicant.id)
        //   .then(applicantMessagesAllSuccessFn, applicantMessagesAllErrorFn);

        // function applicantMessagesAllSuccessFn(data, status, headers, config) {
        //   vm.applicant_messages = data.data;
        // }

        // function applicantMessagesAllErrorFn(data, status, headers, config) {
        //   console.log('Error while retrieving messages');
        // }
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
