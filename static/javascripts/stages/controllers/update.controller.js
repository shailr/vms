(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('UpdateStageController', UpdateStageController);

  UpdateStageController.$inject = ['$location', '$routeParams', 'Stages', 'Applications', 'Authentication'];

  function UpdateStageController($location, $routeParams, Stages, Applications, Authentication) {
    var vm = this;

    vm.app_id = $routeParams.app_id;
    vm.id = $routeParams.id;
    vm.update = update;

    vm.stage = undefined;

    activate();

    function activate() {
      Authentication.all()
        .then(accountsGetSuccessFn, accountsGetErrorFn);

      function accountsGetSuccessFn(data, status, headers, config) {
        vm.accounts = data.data.results;
      }

      function accountsGetErrorFn(data, status, headers, config) {
        console.log("Error during accounts get in UpdateStageController");
      }

      Stages.get(vm.id)
        .then(stageGetSuccessFn, stageGetErrorFn);

      function stageGetSuccessFn(data, status, headers, config) {
        vm.stage = data.data;
      }

      function stageGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stage in UpdateStageController');
      }
    }

    function update() {
      Applications.get(vm.app_id)
        .then(ApplicationGetSuccessFn, ApplicationGetErrorFn);

      function ApplicationGetSuccessFn(data, status, headers, config) {
        vm.application = data.data;

        Authentication.get(vm.assignee)
          .then(accountGetSuccessFn, accountGetErrorFn);

        function accountGetSuccessFn(data, status, headers, config) {
          vm.stage.assignee = data.data;

          Stages.update(vm.stage)
            .then(stageUpdateSuccessFn, stageUpdateErrorFn);

          function stageUpdateSuccessFn(data, status, headers, config) {
            $location.url('/applications/' + vm.application.id + '/stages');
          }

          function stageUpdateErrorFn(data, status, headers, config) {
            console.log('MASSIVE THROBBING ERROR IN UPDATE STAGE CONTROLLER');
            $location.url('/applications/' + vm.application.id + '/stages');
          }
        }

        function accountGetErrorFn(data, status, headers, config) {
          console.log('Error while getting the assignee in UpdateStageController');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, config) {
        console.log('Error while getting application in UpdateStageController');
      }
    }
  }
})();
