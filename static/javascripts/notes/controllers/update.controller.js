(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('UpdateNoteController', UpdateNoteController);

  UpdateNoteController.$inject = ['$routeParams', '$location', 'Notes'];

  function UpdateNoteController(Notes) {
    var vm = this,
        id = $routeParams.id
  }
})();
