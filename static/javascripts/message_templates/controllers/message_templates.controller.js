(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('MessageTemplatesController', MessageTemplatesController);

  function MessageTemplatesController($scope, MessageTemplates) {
    var vm = this;

    vm.templates = [];

    MessageTemplates.all()
      .then(messageTemplatesGetSuccessFn, messageTemplatesGetErrorFn);

    function messageTemplatesGetSuccessFn(data, status, headers, config) {
      vm.templates = data.data.results;
    }

    function messageTemplatesGetErrorFn(data, status, headers, config) {
      console.log('Error while get message templates in MessageTemplatesController');
    }

    activate();

    function activate() {
      $scope.$watchCollection(function () { return vm.templates }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.message_templates = [];

        for (var i = 0; i < current.length; i++) {
          vm.message_templates.push(current[i]);
        }
      }
    }
  }
})();
