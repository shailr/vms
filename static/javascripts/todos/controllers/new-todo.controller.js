(function () {
  'use strict';

  angular
    .module('vms.todos.controllers')
    .controller('NewTodoController', NewTodoController);

  NewTodoController.$inject = ['Authentication', 'Applicants', '$location', '$routeParams', 'Todos', 'History']

  function NewTodoController(Authentication, Applicants, $location, $routeParams, Todos, History) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.app_id = $routeParams.app_id;

    vm.data = {};

    vm.assignee = undefined;

    vm.submit = submit;

    Authentication.all()
      .then(accountsGetSuccessFn, accountsGetErrorFn);

    function accountsGetSuccessFn(data, status, headers, config) {
      vm.accounts = data.data.results;
    }

    function accountsGetErrorFn(data, status, headers, config) {
      console.log("Error during accounts get in NewStageController");
    }

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        Authentication.get(vm.assignee)
          .then(accountGetSuccessFn, accountGetErrorFn);

        function accountGetSuccessFn(data, status, headers, config) {
          vm.assignee = data.data;

          Todos.create(vm.applicant, vm.data.todo, vm.assignee)
            .then(createTodoSuccessFn, createTodoErrorFn);

          function createTodoSuccessFn(data, status, headers, config) {
            console.log('Todo created successfully');

            History.create(vm.applicant, "A todo was assigned to " + data.data.assignee.first_name)
              .then(historyCreateSuccessFn, historyCreateErrorFn);

            function historyCreateSuccessFn(data, status, headers, config) {
              console.log('history = ', data.data);
            }

            function historyCreateErrorFn(data, status, headers, config) {
              console.log('History creation failed');
            }

            $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
          }

          function createTodoErrorFn(data, status, headers, config) {
            console.log('Error while creating a Todo in NewTodoController');

            $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
          }
        }

        function accountGetErrorFn(data, status, headers, config) {
          console.log('Error while retrieving account in NewTodoController');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error while getting fetching applicant in NewTodoController');

        $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
      }
    }
  }
})();
