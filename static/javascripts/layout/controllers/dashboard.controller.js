(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$location', 'Authentication', 'Applicants', 'Stages', 'Todos'];

  function DashboardController($location, Authentication, Applicants, Stages, Todos) {
    var vm = this;

    vm.user = undefined;

    vm.stagedApplicants = {};

    vm.todos = [];

    vm.applicants = [];

    activate();

    function activate() {
      vm.user = Authentication.getAuthenticatedAccount();

      if (vm.user) {
        Applicants.allForAccount(vm.user.id)
          .then(applicantsGetSuccessFn, applicantsGetErrorFn);

        function applicantsGetSuccessFn(data, status, headers, config) {
          vm.applicants = data.data;

          for (var i = 0; i < vm.applicants.length; i++) {
            if (!vm.stagedApplicants[vm.applicants[i].stage.name]) {
              vm.stagedApplicants[vm.applicants[i].stage.name] = [];
            }

            vm.stagedApplicants[vm.applicants[i].stage.name].push(vm.applicants[i]);
          }

          console.log(vm.stagedApplicants);
        }

        function applicantsGetErrorFn(data, status, headers, config) {
          console.log('Error in applicants get function in DashboardController');
        }
      }
    }
  }
})();
