(function () {
  'use strict';

  angular
    .module('vms.applications.controllers')
    .controller('ApplicationDetailController', ApplicationDetailController);

  ApplicationDetailController.$inject = ['$location', '$routeParams', '$scope', 'Applications', 'Stages', 'Authentication'];

  function ApplicationDetailController($location, $routeParams, $scope, Applications, Stages, Authentication) {
    var vm = this;

    vm.application = undefined;

    vm.archive = archive;

    vm.default_stage = undefined;

    activate();

    function activate() {
      var id = $routeParams.id;

      Applications.get(id)
        .then(applicationDetailsSuccessFn, applicationDetailsErrorFn);

      function applicationDetailsSuccessFn(data, status, headers, config) {
        vm.application = data.data;
        vm.stages = [];

        for (var i = 0; i < vm.application.stage_set.length; i++) {
          Stages.get(vm.application.stage_set[i])
            .then(StageGetSuccessFn, StageGetErrorFn);
        }

        function StageGetSuccessFn(data, status, headers, config) {
          var stage = data.data;

          Authentication.get(stage.assignee)
            .then(accountGetSuccessFn, accountGetErrorFn);

          function accountGetSuccessFn(data, status, headers, config) {
            stage.assignee = data.data;
            vm.stages.push(stage);

            if (data.data.default_stage) {
              vm.default_stage = data.data;
            }
          }

          function accountGetErrorFn(data, status, headers, config) {
            console.log('Error while getting account in ApplicationDetailsController');
          }
        }

        function StageGetErrorFn(data, status, headers, config) {
          console.log('Error in Detail Controller stage get function');
        }
      }

      function applicationDetailsErrorFn(data, status, headers, config) {
        $location.url('/applications/');
        console.log('MASSIVE THROBBING ERROR IN DETAILS CONTROLLER');o
      }
    }

    function archive(application) {
      var application_id = application.id

      application.archived = !application.archived;

      Applications.archive(application);
    }
  }
})();
