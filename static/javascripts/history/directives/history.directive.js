(function () {
  'use strict';

  angular
    .module('vms.history.directives')
    .directive('history', history);

  function history() {
    var directive  = {
      restrict: 'E',
      scope: {
        history: '='
      },
      templateUrl: '/static/templates/history/history.html'
    };

    return directive;
  }
})();
