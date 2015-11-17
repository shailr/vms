(function () {
  'use strict';

  angular
    .module('vms.message_templates.controllers')
    .controller('MessageTemplatesController', MessageTemplatesController);

  MessageTemplatesController.$inject = ['$scope', 'MessageTemplates']

  function MessageTemplatesController($scope, MessageTemplates) {
    var vm = this;

    vm.message_templates = [];

    MessageTemplates.all()
      .then(MessageTemplatesAllSuccessFn, MessageTemplatesAllErrorFn);

    function MessageTemplatesAllSuccessFn(data, status, headers, config) {
      vm.message_templates = data.data;
    }

    function MessageTemplatesAllErrorFn(data, status, headers, config) {
      console.log('Error in MessageTemplatesController while fetching message Templates');
    }

    activate();

    function activate () {
      $scope.$watchCollection(function () { return vm.message_templates; }, render);
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
