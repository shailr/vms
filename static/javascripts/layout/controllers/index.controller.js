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

    // temp fix for user names instead of id
    vm.users = {
      "1": "Ashwin Dubey",
      "2": "Muniraj Sisodia",
      "3": "Mahender Singh",
      "4": "Sandeep Sisodia",
      "5": "Shailesh Yadav"
    }

    function activate() {
      var bar_data = [];

      vm.accounts = [];

      Authentication.all()
        .then(accountsGetSuccessFn, accountsGetErrorFn);

      function accountsGetSuccessFn(data, status, headers, config) {
        vm.accounts = data.data.results;
        vm.number_of_accounts = vm.accounts.length;

        for (var account in vm.accounts) {
          Applicants.allFromStageForAccount(vm.accounts[account].id, 2)
            .then(applicantsGetSuccessFn, applicantsGetErrorFn);
        }
      }

      function applicantsGetSuccessFn(data, status, headers, config) {
        var applicants = data.data,
	  applicants_in_calling = [];

        for (var applicant in applicants) {
          if (applicants[applicant].stage === 2) {
	      applicants_in_calling.push(applicants[applicant]);
          }
        }

	if (applicants_in_calling.length > 0) {
          var id = applicants[0].assignee;
          $scope.labels.push(vm.users[id]);
          vm.account_data.push(applicants_in_calling.length);

          if (++vm.current_count == vm.number_of_accounts) {
            $scope.data.push(vm.account_data);
          }
	} else {
	  if (++vm.current_count == vm.number_of_accounts) {
            $scope.data.push(vm.account_data);
          }
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
