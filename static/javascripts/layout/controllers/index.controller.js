(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Organizations'];

  function IndexController($scope, Organizations) {
    var vm = this;

    vm.organizations = [];

    activate();

    function activate() {
      Organizations.all().then(organizationsSuccessFn, organizationsErrorFn);

      $scope.$on('organization.created', function (event, org) {
        //TODO: Fix unshift
        //vm.organizations.unshift(org);

        console.log('Supposed to unshift');
      });

      $scope.$on('organization.created.err', function () {
        vm.organizations.shift();
      });

      function organizationsSuccessFn(data, status, headers, config) {
        console.log('here in orgsuccess', data);
        vm.organizations = data.data;
      }

      function organizationsErrorFn(data, status, headers, config) {
        console.log('ERROR in INDEX CONTROLLER');
      }
    }
  }
})();