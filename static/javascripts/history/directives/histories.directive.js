(function () {
  'use strict';

  angular
    .module('vms.history.directives')
    .directive('histories', histories);

  function histories() {
    var directive = {
      controller: 'HistoryController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        histories: '='
      },
      templateUrl: '/static/templates/history/histories.html'
    };

    return directive;
  }
})();
