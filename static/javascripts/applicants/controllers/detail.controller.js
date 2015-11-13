(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', 'Applicants', 'Notes', 'ApplicantMessages', 'Todos'];

  function ApplicantDetailController($location, $routeParams, Applicants, Notes, ApplicantMessages, Todos) {
    var vm = this;

    vm.applicant = undefined;

    vm.messages = [];

    vm.notes = [];

    vm.todos = [];

    activate();

    function activate() {
      var id = $routeParams.id;

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        vm.applicant.data = JSON.parse(vm.applicant.data);

        Notes.all(vm.applicant.id)
          .then(applicantNotesAllSuccessFn, applicantNotesAllErrorFn);

        function applicantNotesAllSuccessFn(data, status, headers, config) {
          vm.notes = data.data;
        }

        function applicantNotesAllErrorFn(data, status, headers, config) {
          console.log('Error while retrieving notes');
        }

        ApplicantMessages.all(vm.applicant.id)
          .then(applicantMessagesAllSuccessFn, applicantMessagesAllErrorFn);

        function applicantMessagesAllSuccessFn(data, status, headers, config) {
          vm.messages = data.data;
        }

        function applicantMessagesAllErrorFn(data, status, headers, config) {
          console.log('Error while retrieving messages');
        }

        Todos.all(vm.applicant.id)
          .then(applicantTodosAllSuccessFn, applicantTodosAllErrorFn);

        function applicantTodosAllSuccessFn(data, status, headers, config) {
          vm.todos = data.data;
        }

        function applicantTodosAllErrorFn(data, status, headers, config) {
          console.log('Error while retrieving todos');
        }

        // TODO: Add the following things:

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
