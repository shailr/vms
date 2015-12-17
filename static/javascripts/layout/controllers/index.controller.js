(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Applicants'];

  function IndexController($scope, Authentication, Applicants) {
    var vm = this;

    activate();

    $scope.labels = [];

    $scope.data = [];

    vm.account_data = [];

    vm.number_of_accounts = 0;

    vm.current_count = 0;

    function activate() {
      var bar_data = [];

      vm.accounts = [];

      Authentication.all()
        .then(accountsGetSuccessFn, accountsGetErrorFn);

      function accountsGetSuccessFn(data, status, headers, config) {
        vm.accounts = data.data.results;
        vm.number_of_accounts = vm.accounts.length;

        for (var account in vm.accounts) {
          Applicants.allForAccount(vm.accounts[account].id)
            .then(applicantsGetSuccessFn, applicantsGetErrorFn);
        }
      }

      function applicantsGetSuccessFn(data, status, headers, config) {
        var applicants = data.data;

	if (applicants.length > 0) {
          $scope.labels.push(applicants[0].assignee);
          vm.account_data.push(applicants.length);

          if (++vm.current_count == vm.number_of_accounts) {
            $scope.data.push(vm.account_data);
          }
	} else {
	  vm.current_count++;
	}
      }

      function applicantsGetErrorFn(data, status, headers, config) {
        console.log('Error while getting applicants in IndexController');
      }

      function accountsGetErrorFn(data, status, headers, config) {
        console.log('Error while getting accounts in IndexController');
      }
    }
  }
})();
