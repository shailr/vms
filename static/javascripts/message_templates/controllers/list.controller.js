(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('MessageTemplatesListController', MessageTemplatesListController);

  MessageTemplatesListController.$inject = ['$location', 'MessageTemplates'];

  function MessageTemplatesListController($location, MessageTemplates) {
    var vm = this;

    vm.message_templates = [];

    activate();

    function activate() {
      MessageTemplates.all()
        .then(templateListSuccessFn, templateListErrorFn);

      function templateListSuccessFn(data, status, headers, config) {
        vm.message_templates = data.data;
      }

      function templateListErrorFn(data, status, headers, config) {
        console.log('Error in MessageTemplatesListController');
        $location.url('/');
      }
    }
  }
})();
