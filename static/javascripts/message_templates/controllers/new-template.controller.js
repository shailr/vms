(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('NewMessageTemplateController', NewMessageTemplateController);

  NewMessageTemplateController.$inject = ['$location', 'MessageTemplates'];

  function NewMessageTemplateController($location, MessageTemplates) {
    var vm = this;

    vm.title = vm.body = undefined;

    vm.submit = submit;

    function submit() {
      MessageTemplates.create(vm.title, vm.body)
        .then(createTemplateSuccessFn, createTemplateErrorFn);

      function createTemplateSuccessFn(data, status, headers, config) {
        console.log('Yay! Template Created');

        $location.url('/templates');
      }

      function createTemplateErrorFn(data, status, headers, config) {
        console.log('Error while creating message templates in NewMessageTemplateController');
      }
    }
  }
})();
