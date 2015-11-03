(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('NewApplicantController', NewApplicantController);

  NewApplicantController = ['$routeParams', '$rootScope', '$scope', 'Applicants', 'Applications'];

  function NewApplicantController($routeParams, $rootScope, $scope, Applicants, Applications) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {};

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
            application: data.data,
            data: vm.data
          });

          $scope.closeThisDialog();
        }

        function createApplicantErrorFn(data, status, headers, config) {
          console.log('MASSIVE THROBBING ERROR IN NEW APPLICANT CONTROLLER');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, congfig) {
        console.log('Error in New Applicant Controller from Applicant get function');
      }
    }
  }
})();
