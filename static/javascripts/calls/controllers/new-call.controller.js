(function () {
  'use strict';

  angular
    .module('vms.calls.controllers')
    .controller('NewCallController', NewCallController);

  NewCallController.$inject = ['$location', '$routeParams', '$rootScope', 'Applicants', 'Calls', 'History'];

  function NewCallController($location, $routeParams, $rootScope, Applicants, Calls, History) {
    var vm = this;

    vm.id = $routeParams.id;
    vm.app_id = $routeParams.app_id;
    vm.submit = submit;
    vm.start_time = undefined;
    vm.end_time = undefined;
    vm.rating = undefined;

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        Calls.create(vm.applicant, vm.start_time, vm.end_time, vm.rating)
          .then(callCreateSuccessFn, callCreateErrorFn);

        function callCreateSuccessFn(data, status, headers, config) {
          History.create(vm.applicant, 'A call was made');
        }

        function callCreateErrorFn(data, status, headers, config) {
          console.log('History Creation failed in NewCallController');
        }

        $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error while getting Applicant in NewCallController');
        $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
      }
    }
  }
})();
