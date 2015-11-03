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

        Notes.create(vm.applicant, vm.data)
          .then(createNoteSuccessFn, createNoteErrorFn);

        function createNoteSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('note.created', {
            applicant: vm.applicant,
            data: vm.data
          });

          $scope.closeThisDialog();

          console.log('Note created. note = ', data.data);
        }

        function createNoteErrorFn(data, status, headers, config) {
          console.log('Error while creating a note in NewNoteController');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error while getting applicant in NewNoteController');
      }
    }
  }
})();
