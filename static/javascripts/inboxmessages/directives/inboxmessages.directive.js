(function () {
  'use strict';

  angular
    .module('vms.inboxmessages.directives')
    .directive('inboxmessages', inboxmessages);

  function inboxmessages() {
    var directive = {
      controller: 'InboxMessagesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        inboxmessages: '='
      },
      templateUrl: '/static/templates/inboxmessages/inboxmessages.html'
    };

    return directive;
  }
})();
