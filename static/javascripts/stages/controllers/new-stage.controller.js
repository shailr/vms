(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('NewStageController', NewStageController);

  NewStageController.$inject = ['$location', '$routeParams', '$rootScope', '$scope', 'Stages', 'Applications', 'Authentication'];

  function NewStageController($location, $routeParams, $rootScope, $scope, Stages, Applications, Authentication) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.accounts = [];

    vm.assignee = undefined;

    vm.submit = submit;

    Authentication.all()
      .then(accountsGetSuccessFn, accountsGetErrorFn);

    function accountsGetSuccessFn(data, status, headers, config) {
      vm.accounts = data.data.results;
      console.log("accounts = ", data.data);
    }

    function accountsGetErrorFn(data, status, headers, config) {
      console.log("Error during accounts get in NewStageController");
    }

    function submit() {
      Applications.get(vm.id)
        .then(ApplicationGetSuccessFn, ApplicationGetErrorFn);

      function ApplicationGetSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('stage.created', {
          name: vm.name,
          id: vm.id
        });

        vm.application = data.data;

        Authentication.get(vm.assignee)
          .then(accountGetSuccessFn, accountGetErrorFn);

        function accountGetSuccessFn(data, status, headers, config) {
          vm.assignee = data.data;

          Stages.create(vm.application, vm.name, vm.assignee)
            .then(createStageSuccessFn, createStageErrorFn);

          function createStageSuccessFn(data, status, headers, config) {
            console.log('Stage Created');
            $location.url('/applications/' + vm.application.id + '/stages');
          }

          function createStageErrorFn(data, status, headers, config) {
            console.log('MASSIVE THROBBING ERROR IN NEW STAGE CONTROLLER');
            $rootScope.$broadcast('stage.created.error');
            $location.url('/applications/' + vm.application.id + '/stages');
          }
        }

        function accountGetErrorFn(data, status, headers, config) {
          console.log('Error while retireving account in NewStageController');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, config) {
        console.log('Error in New Stage controller from application get function');
      }
    }
  }
})();
