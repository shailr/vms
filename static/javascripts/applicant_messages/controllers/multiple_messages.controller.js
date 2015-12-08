(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('MultipleMessagesController', MultipleMessagesController);

  MultipleMessagesController.$inject = ['$location', '$rootScope', 'MessageTemplates', 'ApplicantMessages', 'History'];

  function MultipleMessagesController($location, $rootScope, MessageTemplates, ApplicantMessages, History) {
    var vm = this;

    vm.data = {};
    vm.templates = [];
    vm.filled_template = undefined;
    vm.submit = submit;
    vm.changeTemplate = changeTemplate;
    vm.applicants = $rootScope.selected_items;

    activate();

    function activate() {
      MessageTemplates.all()
        .then(templatesGetSuccessFn, templatesGetErrorFn);

      function templatesGetSuccessFn(data, status, headers, config) {
        vm.templates = data.data.results;
      }

      function templatesGetErrorFn(data, status, headers, config) {
        console.log('Error while getting templates in MultipleMessagesController');
      }
    }

    function changeTemplate() {
      MessageTemplates.get(vm.template)
        .then(templateGetSuccessFn, templateGetErrorFn);

      function templateGetSuccessFn(data, status, headers, config) {
        vm.filled_template = data.data;
      }

      function templateGetErrorFn(data, status, headers, config) {
        console.log('Error while fetching template im MultipleMessagesController');
      }
    }


    function submit() {
      var count = 0;

      for (var applicant in vm.applicants) {
        ApplicantMessages.create(vm.applicants[applicant], vm.filled_template.body)
          .then(createMessageSuccessFn, createMessageErrorFn);

        function createMessageSuccessFn(data, status, headers, config) {
          History.create(vm.applicants[applicant], 'A message was created');

          if (++count == vm.applicants.length) {
            $location.url('/applications/1/applicants/');
          }
        }

        function createMessageErrorFn(data, status, headers, comfig) {
          if (++count == vm.applicants.length) {
            $location.url('/applications/1/applicants/');
          }

          console.log('Error in create message in MultipleMessagesController');
        }
      }
    }
  }
})();
