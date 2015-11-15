(function () {
  'use strict';

  angular
    .module('vms.tags.directives')
    .directive('tag', tag);

  function tag() {
    var directive = {
      restrict: 'E',
      scope: {
        tag: '='
      },
      templateUrl: '/static/templates/tags/tag.html'
    };

    return directive;
  }
})();
