(function () {
  'use strict';

  angular
    .module('vms.notes.controllers')
    .controller('NewNoteController', NewNoteController);

  function NewNoteController($routeParams, $rootScope, $scope, Notes, Applicants) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {};

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccesFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('note.created', {
          applicant: data.data,
          data: vm.data
        });

        vm.applicant = data.data;

        $scope.closeThisDialog();

        Notes.create(vm.applicant, vm.data)
          .then(createNoteSuccessFn, createNoteErrorFn);

        function createNoteSuccessFn(data, status, headers, config) {
          console.log('Note create successfullt. Note = ', data.data);
        }

        function createNoteErrorFn(data, status, headers, config) {
          console.log('Error while create Note in NewNoteController');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error while getting the applicant in new Not Controller');
      }
    }
  }
})();
