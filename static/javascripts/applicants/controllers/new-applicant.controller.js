(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('NewApplicantController', NewApplicantController);

  NewApplicantController = ['$routeParams', '$rootScope', '$scope', 'Applicants', 'Applications', 'atomicNotifyService'];

  function NewApplicantController($location, $routeParams, $rootScope, $scope, Applicants, Applications, atomicNotifyService) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {
      address: {},
      birth: {},
      income: {},
      category: {},
      disability: {},
      orphan: {},
      knowledge: {}
    };

    vm.submit = submit;

    function submit() {
      Applications.get(vm.id)
        .then(ApplicationGetSuccessFn, ApplicationGetErrorFn);

      function ApplicationGetSuccessFn(data, status, headers, config) {
        vm.application = data.data;

        Applicants.create(vm.application, vm.data)
          .then(createApplicantSuccessFn, createApplicantErrorFn);

        function createApplicantSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('applicant.created', {
            applicant: data.data,
            data: vm.data
          });

          atomicNotifyService.success('yay! awesome');

          $location.url('/applications/' + vm.id + '/applicants/');
        }

        function createApplicantErrorFn(data, status, headers, config) {
          console.log('MASSIVE THROBBING ERROR IN NEW APPLICANT CONTROLLER');

          $location.url('/applications/' + vm.id + '/applicants/');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, congfig) {
        console.log('Error in New Applicant Controller from Applicant get function');
      }
    }
  }
})();
