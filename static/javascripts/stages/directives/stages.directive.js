(function () {
  'use strict';

  angular
    .module('vms.stages.directives')
    .directive('stages', stages);

  function stages() {
    var directive = {
      controller: 'StagesController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        stages: '='
      },
      templateUrl: '/static/templates/stages/stages.html'
    };

    return directive;
  }
})();
