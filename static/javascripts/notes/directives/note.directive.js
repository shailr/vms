(function () {
  'use strict';

  angular
    .module('vms.notes.directives')
    .directive('note', note);

  function note() {
    var directive = {
      restrict: 'E',
      scope: {
        note: '='
      },
      templateUrl: '/static/templates/notes/note.html'
    };

    return directive;
  }
})();
