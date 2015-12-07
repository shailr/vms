(function () {
  'use strict';

  angular
    .module('vms.inboxmessages.controllers')
    .controller('InboxMessagesListController', InboxMessagesListController);

  InboxMessagesListController.$inject = ['$location', 'InboxMessages', 'Authentication'];

  function InboxMessagesListController($location, InboxMessages, Authentication) {
    var vm = this;

    vm.inboxmessages = [];

    vm.user = undefined;

    activate();

    function activate() {
      vm.user = Authentication.getAuthenticatedAccount();

      if (vm.user) {
        InboxMessages.all(vm.user.id)
          .then(messageListSuccessFn, messageListErrorFn);

        function messageListSuccessFn(data, status, headers, config) {
          vm.inboxmessages = data.data;
        }

        function messageListErrorFn(data, status, headers, config) {
          console.log('Error while fetching inbox messages in InboxMessagesListController');

          $location.url('/dashboard');
        }
      } else {
        $location.url('/login');
      }
    }
  }
})();
