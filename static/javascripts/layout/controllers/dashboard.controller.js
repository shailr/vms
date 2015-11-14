(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$location', 'Authentication', 'Applicants', 'Stages', 'Todos'];

  function DashboardController($location, Authentication, Applicants, Stages, Todos) {
    var vm = this;

    vm.user = undefined;

    vm.stages = [];

    vm.labels = [];

    vm.data = [];

    vm.todos = [];

    vm.applicants = 0;

    activate();

    function activate() {
      vm.user = Authentication.getAuthenticatedAccount();

      if (vm.user) {
        if(vm.user.stage_set) {
          for (var i = 0; i < vm.user.stage_set.length; i++) {
            Stages.get(vm.user.stage_set[i])
              .then(StageGetSuccessFn, StageGetErrorFn);

            function StageGetSuccessFn(data, status, headers, config) {
              if (data.data.applicant_set.length) {
                vm.stages.push(data.data);
                vm.labels.push(data.data.name);
                vm.data.push(data.data.applicant_set.length)
                vm.applicants += data.data.applicant_set.length;
              }
            }

            function StageGetErrorFn(data, status, headers, config) {
              console.log('Error in Layout DashboardController');

              $location.url('/');
            }
          }
        }

        if(vm.user.todos_assigned) {
          for (var i = 0; i < vm.user.todos_assigned.length; i++) {
            Todos.get(vm.user.todos_assigned[i])
              .then(TodosGetSuccessFn, TodosGetErrorFn);

            function TodosGetSuccessFn(data, status, headers, config) {
              vm.todos.push(data.data);
            }

            function TodosGetErrorFn(data, status, headers, config) {
              console.log('Error in layout DashboardController');

              $location.url('/');
            }
          }
        }
      }
    }
  }
})();
