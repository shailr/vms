(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('NoteListController', NoteListController);

  function NoteListController() {
    var vm = this;

    activate();

    function activate() {
      console.log('hwerwerhewr');
    }
  }
})();
