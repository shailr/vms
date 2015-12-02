(function () {
  'use strict';

  angular
    .module('vms.layout.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$location', 'Authentication', 'Applicants', 'Stages', 'Todos'];

  function DashboardController($scope, $location, Authentication, Applicants, Stages, Todos) {
    var vm = this;

    vm.user = undefined;

    vm.stagedApplicants = {};

    vm.todos = [];

    vm.applicants = [];

    vm.starred_applicants = [];

    $scope.labels = [];

    $scope.data = [];

    $scope.options = {
      animation: false,
      responsive: true,
      legend: true
    };

    $scope.gotoStage = gotoStage;

    activate();

    function gotoStage(points, evt) {
      var stage_name = points[0]["label"],
          stages = [];

      // Possible bug here. Come back to fix this
      Stages.allAcrossApplications()
        .then(StagesGetSuccessFn, StagesGetErrorFn);

      function StagesGetSuccessFn(data, status, headers, config) {
        stages = data.data.results;

        console.log(stages);

        for (var i = 0; i < stages.length; i++) {
          var stage = stages[i];

          if (stage.name == stage_name) {
            $location.url('/stages/' + stage.id + '/applicants');

            break;
          }
        }
      }

      function StagesGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stages in DashboardController');
      }
    }

    function activate() {
      var bar_data = [];

      vm.user = Authentication.getAuthenticatedAccount();

      Authentication.get(vm.user.id)
        .then(accountGetSuccessFn, accountGetErrorFn);

      function accountGetSuccessFn(data, status, headers, config) {
        vm.user = data.data;
      }

      function accountGetErrorFn(data, status, headers, config) {
        console.log('Error while getting user in DashboardController');
      }

      if (vm.user) {
        Applicants.allForAccount(vm.user.id)
          .then(applicantsGetSuccessFn, applicantsGetErrorFn);

        function applicantsGetSuccessFn(data, status, headers, config) {
          vm.applicants = data.data;

          for (var i = 0; i < vm.applicants.length; i++) {
            if (!vm.stagedApplicants[vm.applicants[i].stage.name]) {
              vm.stagedApplicants[vm.applicants[i].stage.name] = [];
            }

            vm.stagedApplicants[vm.applicants[i].stage.name].push(vm.applicants[i]);
          }

          for (var stage in vm.stagedApplicants) {
            $scope.labels.push(stage);
            bar_data.push(vm.stagedApplicants[stage].length);
          }

          $scope.data.push(bar_data);
        }

        function applicantsGetErrorFn(data, status, headers, config) {
          console.log('Error in applicants get function in DashboardController');
        }

        Applicants.allStarredAcrossApplications()
          .then(allStarredGetSuccessFn, allStarredGetErrorFn);

        function allStarredGetSuccessFn(data, status, headers, config) {
          vm.starred_applicants = data.data;
        }

        function allStarredGetErrorFn(data, status, headers, config) {
          console.log('Error while getting Starred Applicants in DashboardController');
        }
      }
    }
  }
})();
