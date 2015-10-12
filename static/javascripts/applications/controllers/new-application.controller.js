(function () {
  'use strict';

  angular
    .module('vms.applications.controllers')
    .controller('NewApplicationController', NewApplicationController);

  NewApplicationController.$inject = ['$rootScope', '$scope', 'Authentication', 'Applications'];

  function NewApplicationController($rootScope, $scope, Authentication, Applications) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      $rootScope.$broadcast('application.created', {
        title: vm.title,
        details: vm.details
      });

      $scope.closeThisDialog();

      Applications.create(vm.title, vm.details)
        .then(createApplicationSuccessFn, createApplicationErrorFn);

      function createApplicationSuccessFn(data, status, headers, config) {
        console.log('Post created');
      }

      function createApplicationErrorFn(data, status, headers, config) {
        console.log('MASSIVE THROBBING ERROR IN NEW APPLICATION CONTROLLER');
        $rootScope.$broadcast('application.created.error');
      }
    }
  }
})();
