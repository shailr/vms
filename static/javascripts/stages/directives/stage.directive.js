(function () {
  'use strict';

  angular
    .module('vms.stages.directives')
    .directive('stage', stage);

  function stage() {
    var directive = {
      restrict: 'E',
      scope: {
        stage: '='
      },
      templateUrl: '/static/templates/stages/stage.html'
    };

    return directive;
  }
})();
