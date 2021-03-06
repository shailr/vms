(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('NewNoteController', NewNoteController);

  NewNoteController.$inject = ['$location', '$routeParams', '$rootScope', 'Applicants', 'Notes', 'History']

  function NewNoteController($location, $routeParams, $rootScope, Applicants, Notes, History) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.app_id = $routeParams.app_id;

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

          console.log("note = ", data.data);

          History.create(vm.applicant, "An internal note was created")
            .then(historyCreateSuccessFn, historyCreateErrorFn);

          function historyCreateSuccessFn(data, status, headers, config) {
            console.log('history = ', data.data);
          }

          function historyCreateErrorFn(data, status, headers, config) {
            console.log('History creation failed');
          }

          $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
        }

        function createNoteErrorFn(data, status, headers, config) {
          console.log('Error in create note in new note controller');
          $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get in new note controller');
        $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
      }
    }
  }
})();
