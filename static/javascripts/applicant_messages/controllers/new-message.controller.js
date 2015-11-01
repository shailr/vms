(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('NewMessageController', NewMessageController);

  NewMessageController.$inject = ['$routeParams', '$rootScope', '$scope', 'ApplicantMessages', 'Applicants']

  function NewMessageController($routeParams, $rootScope, $scope, ApplicantMessages, Applicants) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {};

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('message.created', {
          applicant: data.data,
          data: vm.data
        });

        vm.applicant = data.data;

        $scope.closeThisDialog();

        ApplicantMessages.create(vm.applicant, vm.data)
          .then(createMessageSuccessFn, createMessageErrorFn);

        function createMessageSuccessFn(data, status, headers, config) {
          console.log('Message successfully created. Message = ', data.data);
        }

        function createMessageErrorFn(data, status, headers, config) {
          console.log('Error while creating Message in NewMessageController');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('MASSIVE THROBBING ERROR IN NEW MESSAGE CONTROLLER');
      }
    }
  }
})();
