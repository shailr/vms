(function () {
  'use strict';

  angular
    .module('vms.organizations.controllers')
    .controller('NewOrganizationController', NewOrganizationController);

  NewOrganizationController.$inject = ['$rootScope', '$scope', 'Organizations']

  function NewOrganizationController($rootScope, $scope, Organizations) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      $rootScope.$broadcast('organization.created', {
        name: vm.name,
        phone: vm.phone,
        location: vm.location
      });

      $scope.closeThisDialog();

      Organizations.create(vm.name, vm.phone, vm.location)
        .then(createOrgSuccessFn, createOrgErrorFn);

      function createOrgSuccessFn(data, status, headers, config) {
        console.log('Org create', data);
      }

      function createOrgErrorFn(data, status, headers, config) {
        console.log('MASSIVE THROBBING ERROR', data);
      }
    }
  }
})();
