(function () {
  'use strict';

  angular
    .module('vms.inboxmessages.directives')
    .directive('inboxmessage', inboxmessage);

  function inboxmessage() {
    var directive = {
      restrict: 'E',
      scope: {
        inboxmessage: '='
      },
      templateUrl: '/static/templates/inboxmessages/inboxmessage.html'
    };

    return directive;
  }
})();
