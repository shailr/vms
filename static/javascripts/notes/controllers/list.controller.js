(function () {
  'use strict';

  console.log('here in notes list controller');

  angular
    .module('vms.notes.controllers')
    .controller('NoteListController', NoteListController);

  NoteListController.$inject = ['$routeParams', '$scope', 'Notes'];

  function NoteListController($routeParams, $scope, Notes) {
    var vm = this;

    vm.notes = [];

    activate();

    function activate() {
      var id  = $routeParams.id;

      Notes.all(id)
        .then(noteListSuccessFn, noteListErrorFn);

      $scope.$on('note.created', function(event, note) {
        vm.notes.unshift(note);
      });

      $scope.$on('note.created.error', function() {
        vm.notes.shift();
      });

      function noteListSuccessFn(data, status, headers, config) {
        vm.notes = data.data;
      }

      function noteListErrorFn(data, status, headers, config) {
        console.log('Error in Note List All Function');
      }
    }
  }
})();
