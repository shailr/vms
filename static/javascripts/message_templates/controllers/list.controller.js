(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('MessageTemplatesListController', MessageTemplatesListController);

  MessageTemplatesListController.$inject = ['$location', 'MessageTemplates'];

  function MessageTemplatesListController($location, MessageTemplates) {
    var vm = this;

    vm.templates = [];

    activate();

    function activate() {
      MessageTemplates.all()
        .then(messageTemplatesAllSuccessFn, messageTemplatesAllErrorFn);

      function messageTemplatesAllSuccessFn(data, status, headers, config) {
        vm.templates = data.data.results;
      }

      function messageTemplatesAllErrorFn(data, status, headers, config) {
        console.log('Error in getting templates in MessageTemplatesListController');
      }
    }
  }
})();
