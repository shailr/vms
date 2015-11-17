(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('NewMessageTemplateController', NewMessageTemplateController);

  NewMessageTemplateController.$inject = ['$location', 'MessageTemplates'];

  function NewMessageTemplateController($location, MessageTemplates) {
    var vm = this;

    vm.body = undefined;

    vm.title = undefined;

    vm.submit = submit;

    function submit() {
      MessageTemplates.create(vm.title, vm.body)
        .then(createTemplateSuccessFn, createTemplateErrorFn);

      function createTemplateSuccessFn(data, status, headers, config) {
        console.log('Yay! Template successfully created', data.data);
        $location.url('/templates');
      }

      function createTemplateErrorFn(data, status, headers, config) {
        console.log('Error in Template creation in NewMessageTemplateController');
        $location.url('/templates');
      }
    }
  }
})();
