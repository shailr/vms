(function () {
  'use strict';

  angular
    .module('vms.tags.directives')
    .directive('tags', tags);

  function tags() {
    var directive = {
      controller: 'TagsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        tags: '='
      },
      templateUrl: '/static/templates/tags/tags.html'
    };

    return directive;
  }
})();
