(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('ApplicantMessagesController', ApplicantMessagesController);

  ApplicantMessagesController.$inject = ['$scope', '$routeParams', 'ApplicantMessages'];

  function ApplicantMessagesController($scope, $routeParams, ApplicantMessages) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.messages = [];

    ApplicantMessages.all(vm.id).
      then(applicantGetSuccessFn, applicantGetErrorFn);

    function applicantGetSuccessFn(data, status, headers, config) {
      vm.messages = data.data;
    }

    function applicantGetErrorFn(data, status, headers, config) {
      console.log('Error while getting applicant in ApplicantMessagesController');
    }

    activate();

    function activate() {
      $scope.$watchCollection(function () { return vm.messages; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.messages = [];

        for (var i = 0; i <current.length; i++) {
          vm.messages.push(current[i]);
        }
      }
    }
  }
})();
