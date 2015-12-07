(function () {
  'use strict';

  angular
    .module('vms.applicant_messages.controllers')
    .controller('NewMessageController', NewMessageController);

  NewMessageController.$inject = ['$location', '$routeParams', '$rootScope', 'Applicants', 'ApplicantMessages', 'MessageTemplates'];

  function NewMessageController($location, $routeParams, $rootScope, Applicants, ApplicantMessages, MessageTemplates) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.app_id = $routeParams.app_id;

    vm.data = {};

    vm.templates = [];

    vm.filled_template = undefined;

    vm.submit = submit;

    vm.changeTemplate = changeTemplate;

    MessageTemplates.all()
      .then(templatesGetSuccessFn, templatesGetErrorFn);

    function templatesGetSuccessFn(data, staus, headers, config) {
      vm.templates = data.data.results;
    }

    function templatesGetErrorFn(data, status, headers, config) {
      console.log('Error while getting templates in NewMessageController');
    }

    function changeTemplate() {
      MessageTemplates.get(vm.template)
        .then(templateGetSuccessFn, templateGetErrorFn);
    }

    function templateGetSuccessFn(data, status, headers, config) {
      vm.filled_template = data.data;
    }

    function templateGetErrorFn(data, status, headers, config) {
      console.log('Error while fetching the template');
    }

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        ApplicantMessages.create(vm.applicant, vm.filled_template.body)
          .then(createMessageSuccessFn, createMessageErrorFn);

        function createMessageSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('message.created', {
            applicant: vm.applicant,
            data: vm.data
          });

          History.create(vm.applicant, "A message was sent")
            .then(historyCreateSuccessFn, historyCreateErrorFn);

          function historyCreateSuccessFn(data, status, headers, config) {
            console.log('history = ', data.data);
          }

          function historyCreateErrorFn(data, status, headers, config) {
            console.log('History creation failed');
          }

          $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id + '/');
        }

        function createMessageErrorFn(data, status, headers, config) {
          console.log('Error in create message in new message controller');
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error in applicant get in new message controller');
      }
    }
  }
})();
