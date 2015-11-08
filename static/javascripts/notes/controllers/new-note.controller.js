(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('NewNoteController', NewNoteController);

  NewNoteController.$inject = ['$routeParams', '$rootScope', '$scope', 'Applicants', 'Notes']

  function NewNoteController($routeParams, $rootScope, $scope, Applicants, Notes) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {};

    vm.submit = submit;

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        Notes.create(vm.applicant, vm.data.note)
          .then(createNoteSuccessFn, createNoteErrorFn);

        function createNoteSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('note.created', {
            applicant: vm.applicant,
            data: vm.data
          });

          $scope.closeThisDialog();
        }

        function createNoteErrorFn(data, status, headers, config) {
          console.log('Error in create note in new note controller');
        }
      }

      function applicationGetErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get in new note controller');
      }
    }
  }
})();
