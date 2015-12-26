(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantDetailController', ApplicantDetailController);

  ApplicantDetailController.$inject = ['$location', '$routeParams', '$rootScope', 'Applicants', 'Notes', 'ApplicantMessages', 'Todos', 'History', 'Tags', 'Stages', 'Authentication', 'Calls', 'InboxMessages'];

  function ApplicantDetailController($location, $routeParams, $rootScope, Applicants, Notes, ApplicantMessages, Todos, History, Tags, Stages, Authentication, Calls, InboxMessages) {
    var vm = this;

    vm.applicant = undefined;
    vm.tags = [];
    vm.system_tags = [];
    vm.messages = [];
    vm.notes = [];
    vm.todos = [];
    vm.histories = [];
    vm.stages = [];
    vm.stage = undefined;
    vm.call_started = false;
    vm.accounts = [];
    vm.start_time = undefined;
    vm.end_time = undefined;
    vm.rating = 0;
    vm.tag = undefined;

    vm.changeStage = changeStage;
    vm.changeAssignee = changeAssignee;
    vm.startCall = startCall;
    vm.addTag = addTag;

    $rootScope.current_call = undefined;

    activate();

    function addTag() {
      console.log(vm.tag);

      Tags.create(vm.applicant, vm.tag)
        .then(tagAddSuccessFn, tagAddErrorFn);

      function tagAddSuccessFn(data, status, headers, config) {
        console.log(data.data);
        vm.tags.push(data.data);
      }

      function tagAddErrorFn(data, status, headers, config) {
        console.log('Error while creating tag in ApplicantDetailController');
      }
    }

    function startCall() {
      vm.start_time = vm.end_time = Date.now();

      Calls.create(vm.applicant, vm.rating)
        .then(callCreateSuccessFn, callCreateErrorFn);

      function callCreateSuccessFn(data, status, headers, config) {
        $rootScope.current_call = data.data;

        $location.url('/applications/' + vm.applicant.application.id + '/applicants/' + vm.applicant.id + '/update');
      }

      function callCreateErrorFn(data, status, headers, config) {
        console.log('Error while creating call in ApplicantDetailController');

        $location.url('/applications/' + vm.applicant.application.id + '/applicants/' + vm.applicant.id + '/update');
      }
    }


    function changeStage() {
      Stages.get(vm.stage)
        .then(stageGetSuccessFn, stageGetErrorFn);

      function stageGetSuccessFn(data, status, heades, config) {
        vm.stage = data.data;

        if (typeof vm.applicant.data === "string") {
          vm.applicant.data = JSON.parse(vm.applicant.data);
	}

        if (typeof vm.applicant.query === "string") {
          vm.applicant.query = JSON.parse(vm.applicant.query);
	}

        if (typeof vm.applicant.info === "string") {
          vm.applicant.info = JSON.parse(vm.applicant.info);
	}

        vm.applicant.stage = vm.stage;
        vm.applicant.assignee = vm.stage.assignee;

        console.log('Success in getting the stage', data.data);

        Applicants.update(vm.applicant)
          .then(updateApplicantSuccessFn, updateApplicantErrorFn);

        function updateApplicantSuccessFn(data, status, headers, config) {
          vm.applicant = data.data;

          Authentication.get(vm.applicant.assignee)
            .then(assigneeGetSuccessFn, assigneeGetErrorFn);

          function assigneeGetSuccessFn(data, status, headers, config) {
            vm.assignee = data.data;
          }

          function assigneeGetErrorFn(data, status, headers, config) {
            console.log('Error while getting assignee in ApplicantDetailController');
          }

          vm.stage = vm.applicant.stage;

          History.create(vm.applicant, "Stage was changed to " + vm.stage.name + "")
            .then(historyCreateSuccessFn, historyCreateErrorFn);

          InboxMessages.create(vm.applicant, 'was moved to stage ' + vm.stage.name, vm.stage.assignee)
            .then(inboxMessageCreateSuccessFn, inboxMessageCreateErrorFn);

          function inboxMessageCreateSuccessFn(data, status, headers, config) {
            console.log('inbox message = ', data.data);
          }

          function inboxMessageCreateErrorFn(data, status, headers, config) {
            console.log('Error while creating inbox message in ApplicantDetailController');
          }

          function historyCreateSuccessFn(data, status, headers, config) {
            console.log('history = ', data.data);
          }

          function historyCreateErrorFn(data, status, headers, config) {
            console.log('History creation failed');
          }

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

    function changeAssignee() {
      Authentication.get(vm.assignee)
        .then(accountGetSuccessFn, accountGetErrorFn);

      function accountGetSuccessFn(data, status, headers, config) {
        vm.applicant.assignee = vm.assignee;
        vm.assignee = data.data;

        if (typeof vm.applicant.data === "string") {
          vm.applicant.data = JSON.parse(vm.applicant.data);
	}

        if (typeof vm.applicant.query === "string") {
          vm.applicant.query = JSON.parse(vm.applicant.query);
	}

        if (typeof vm.applicant.info === "string") {
          vm.applicant.info = JSON.parse(vm.applicant.info);
	}

        Applicants.update(vm.applicant)
          .then(updateApplicantSuccessFn, updateApplicantErrorFn);

        function updateApplicantSuccessFn(data, status, headers, config) {
          vm.applicant = data.data;

          History.create(vm.applicant, 'Assignee changed to ' + vm.assignee.first_name);

          console.log('Applicant Updated', data.data);
        }

        function updateApplicantErrorFn(data, status, headers, config) {
          console.log('Error in updating applicant while changing assignee in ApplicantDetailController');
        }
      }

      function accountGetErrorFn(data, status, headers, config) {
        console.log('Error in getting assignee while changing assignee in ApplicantDetailController');
      }
    }

    function activate() {
      var id = $routeParams.id,
          app_id = $routeParams.app_id;

      Applicants.get(id)
        .then(applicantDetailSuccessFn, applicantDetailErrorFn);

      function applicantDetailSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;
        vm.stage = vm.applicant.stage;

	if (vm.applicant.data) {
          vm.applicant.data = JSON.parse(vm.applicant.data);
	} else {
	    vm.applicant.data = {};
	}

        if (vm.applicant.query) {
          vm.applicant.query = JSON.parse(vm.applicant.query);
	} else {
	  vm.applicant.query = {};
	}

        if (vm.applicant.info) {
          vm.applicant.info = JSON.parse(vm.applicant.info);
	} else {
	  vm.applicant.info = {};
	}

        Tags.all()
          .then(tagsAllSuccessFn, tagsAllErrorFn);

        function tagsAllSuccessFn(data, status, headers, config) {
          vm.system_tags = data.data.results;
        }

        function tagsAllErrorFn(data, status, headers, config) {
          console.log('Error while getting all tags in ApplicantDetailController');
        }

        Stages.all(app_id)
          .then(stagesAllSuccessFn, stagesAllErrorFn);

        function stagesAllSuccessFn(data, status, headers, config) {
          console.log('Yay stages = ', data.data);
          vm.stages = data.data;
        }

        function stagesAllErrorFn(data, status, headers, config) {
          console.log('Error while fetching all stages in ApplicantDetailController');
        }

        Authentication.all()
          .then(accountsAllSuccessFn, accountsAllErrorFn);

        function accountsAllSuccessFn(data, status, headers, config) {
          vm.accounts = data.data.results;
        }

        function accountsAllErrorFn(data, status, headers, config) {
          console.log('Error in fetching accounts in ApplicantDetailController');
        }

        Authentication.get(vm.applicant.assignee)
          .then(assigneeGetSuccessFn, assigneeGetErrorFn);

        function assigneeGetSuccessFn(data, status, headers, config) {
          vm.assignee = data.data;
        }

        function assigneeGetErrorFn(data, status, headers, config) {
          console.log('Error while getting assignee in ApplicantDetailController');
        }


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

      }

      function applicantDetailErrorFn(data, status, headers, config) {
        $location.url('/applications/');
        console.log('MASSIVE THROBBBING ERROR IN APPLCIANT DETAILS CONTROLLER');
      }
    }
  }
})();
