(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$location', 'Authentication', 'Applicants', 'Stages'];

  function DashboardController($location, Authentication, Applicants, Stages) {
    var vm = this;

    vm.user = undefined;

    vm.stages = [];

    vm.labels = [];

    vm.data = [];

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
      }
    }
  }
})();
