(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('ApplicantMessagesController', ApplicantMessagesController);

  ApplicantMessagesController.$inject = ['$scope'];

  function ApplicantMessagesController($scope) {
    var vm = this;

    vm.applicant_messages = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.applicant_messages; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.applicant_messags = [];

        for (var i = 0; i < current.kength; i++) {
          vm.applicants.push(current[i]);
        }
      }
    }
  }
})();
