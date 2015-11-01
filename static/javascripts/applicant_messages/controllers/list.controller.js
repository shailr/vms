(function () {
  'use strict';

  angular
    .module('vms.applicant_messags.controllers')
    .controller('MessageListController', MessageListController);

  function MessageListController($location, $routeParams, $scope, ApplicantMessages) {
    var vm = this;

    vm.applicant_messages = [];

    activate();

    function activate() {
      var id = $routeParams.id;

      ApplicantMessages.all(id)
        .then(messageListSuccessFn, messageListErrorFn);

      $scope.$on('message.created', function(event, message) {
        vm.applicant_messages.unshift(message);
      });

      $scope.$on('message.created.error', function() {
        vm.applicant_messages.shift();
      });

      function messageListSuccessFn(data, status, headers, config) {
        vm.applicant_messages = data.data;
      }

      function messageListErrorFn(data, status, headers, config) {
        console.log('Error in Message List Controller all function');
      }
    }
  }
})();
