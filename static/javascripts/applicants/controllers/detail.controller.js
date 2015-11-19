(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', 'Applicants', 'Notes', 'ApplicantMessages', 'Todos', 'History', 'Tags', 'Stages'];

  function ApplicantDetailController($location, $routeParams, Applicants, Notes, ApplicantMessages, Todos, History, Tags, Stages) {
    var vm = this;

    vm.applicant = undefined;
    vm.tags = [];
    vm.messages = [];
    vm.notes = [];
    vm.todos = [];
    vm.histories = [];
    vm.stages = [];
    vm.stage = undefined;

    vm.changeStage = changeStage;

    activate();

    function changeStage() {
      Stages.get(vm.stage)
        .then(stageGetSuccessFn, stageGetErrorFn);

      function stageGetSuccessFn(data, status, heades, config) {
        vm.stage = data.data;

        vm.applicant.stage = vm.stage;

        console.log('Success in getting the stage', data.data);

        Applicants.update(vm.applicant)
          .then(updateApplicantSuccessFn, updateApplicantErrorFn);

        function updateApplicantSuccessFn(data, status, headers, config) {
          vm.applicant = data.data;

          vm.stage = vm.applicant.stage;

          console.log('Applicant updated successfully', vm.applicant);
        }

        function updateApplicantErrorFn(data, status, headers, config) {
          console.log('Error while changing stage in ApplicantDetailController');
        }

      }

      function stageGetErrorFn(data, status, headers, config) {
        console.log('Error in getting stage in changeState in ApplicantDetailController');
      }

    }

    function activate() {
      var id = $routeParams.id,
          app_id = $routeParams.app_id;

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        Stages.all(app_id)
          .then(stagesAllSuccessFn, stagesAllErrorFn);

        function stagesAllSuccessFn(data, status, headers, config) {
          console.log('Yay stages = ', data.data);
          vm.stages = data.data;
        }

        function stagesAllErrorFn(data, status, headers, config) {
          console.log('Error while fetching all stages in ApplicantDetailController');
        }

        vm.applicant = data.data;

        vm.stage = vm.applicant.stage;

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
