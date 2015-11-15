(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', 'Applicants', 'Notes', 'ApplicantMessages', 'Todos', 'History', 'Tags'];

  function ApplicantDetailController($location, $routeParams, Applicants, Notes, ApplicantMessages, Todos, History, Tags) {
    var vm = this;

    vm.applicant = undefined;

    vm.tags = [];

    vm.messages = [];

    vm.notes = [];

    vm.todos = [];

    vm.histories = [];

    activate();

    function activate() {
      var id = $routeParams.id;

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        vm.applicant.data = JSON.parse(vm.applicant.data);

        Tags.allFromApplicant(vm.applicant.id)
          .then(applicantTagsAllSuccessFn, applicantTagsAllErrorFn);

        function applicantTagsAllSuccessFn(data, status, headers, config) {
          vm.tags = data.data;
        }

        function applicantTagsAllErrorFn(data, status, headers, config) {
          console.log('Error while fetching tags in ApplicantDetailController');
        }

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

        History.all(vm.applicant.id)
          .then(applicantHistoryAllSuccessFn, applicantHistoryAllErrorFn);

        function applicantHistoryAllSuccessFn(data, status, headers, config) {
          vm.histories = data.data;
        }

        function applicantHistoryAllErrorFn(data, status, headers, config) {
          console.log('Error while fetching history');
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
