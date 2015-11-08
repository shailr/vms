(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('NewMessageController', NewMessageController);

  NewMessageController.$inject = ['$routeParams', '$rootScope', 'Applicants', 'ApplicantMessages'];

  function NewMessageController($routeParams, $rootScope, Applicants, ApplicantMessages) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {};

    vm.submit = submit;

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        ApplicantMessages.create(vm.applicant, vm.data.message)
          .then(createMessageSuccessFn, createMessageErrorFn);

        function createMessageSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('message.created', {
            applicant: vm.applicant,
            data: vm.data
          });

          $scope.closeThisDialog();
        }

        function createMessageErrorFn(data, status, headers, config) {
          console.log('Error in create message in new message controller');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error in applicant get in new message controller');
      }
    }
  }
})();
