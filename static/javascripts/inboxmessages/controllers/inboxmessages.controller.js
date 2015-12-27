(function () {
  'use strict';

  angular
    .module('vms.inboxmessages.controllers')
    .controller('InboxMessagesController', InboxMessagesController);

  InboxMessagesController.$inject = ['$scope', 'InboxMessages', '$location'];

  function InboxMessagesController($scope, InboxMessages, $location) {
    var vm = this;

    vm.inboxmessages = [];

    vm.read = read;

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.inboxmessages; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.inboxmessages = [];

        for (var i = 0; i < current.length; i++) {
          vm.inboxmessages.push(current[i]);
        }
      }
    }

    function read(inboxmessage) {
      var application_id = 1,
          applicant_id = inboxmessage.applicant;

      if (!inboxmessage.read) {
        inboxmessage.read = true;
        InboxMessages.update(inboxmessage);
      }

      $location.url('/applications/' + application_id + '/applicants/' + applicant_id + '/');
    }
  }
})();
