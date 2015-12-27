(function () {
  'use strict';

  angular
    .module('vms.stages.controllers')
    .controller('MultipleStageChangeController', MultipleStageChangeController);

  MultipleStageChangeController.$inject = ['Applicants', 'Stages', 'History', '$location', '$rootScope'];

  function MultipleStageChangeController(Applicants, Stages, History, $location, $rootScope) {
    var vm = this;

    vm.stages = [];
    vm.stage = undefined;
    vm.changeStage = changeStage;
    vm.applicants = $rootScope.selected_items;

    activate();

    function activate() {
      Stages.all(1)
        .then(stagesGetSuccessFn, stagesGetErrorFn);

      function stagesGetSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
      }

      function stagesGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stages in MultipleStageChangeController');
      }
    }

    function changeStage() {
      var count = 0;

      Stages.get(vm.stage)
        .then(stageGetSuccessFn, stageGetErrorFn);

      function stageGetSuccessFn(data, status, headers, config) {
        vm.stage = data.data;

        for (var applicant in vm.applicants) {
          vm.applicants[applicant].stage = vm.stage.id;
          vm.applicants[applicant].assignee = vm.stage.assignee;

          if (typeof vm.applicants[applicant].data === "string") {
            vm.applicants[applicant].data = JSON.parse(vm.applicants[applicant].data);
	  }

          if (typeof vm.applicants[applicant].query === "string") {
            vm.applicants[applicant].query = JSON.parse(vm.applicants[applicant].query);
	  }

          if (typeof vm.applicants[applicant].info === "string") {
            vm.applicants[applicant].info = JSON.parse(vm.applicants[applicant].info);
	  }

          console.log(vm.applicants[applicant]);

          Applicants.update(vm.applicants[applicant])
            .then(applicantUpdateSuccessFn, applicantUpdateErrorFn);

          function applicantUpdateSuccessFn(data, status, headers, config) {
            History.create(vm.applicants[applicant], 'Stage was changed to ' + vm.stage.name);

            console.log('success');

            if (++count == vm.applicants.length) {
              $location.url('/applications/1/applicants/');
            }
          }

          function applicantUpdateErrorFn(data, status, headers, config){
            if (++count == vm.applicants.length) {
              $location.url('/applications/1/applicants/');
            }

            console.log('Error while changing stage in MultipleStageChangeController');
          }
      }

      }

      function stageGetErrorFn(data, status, headers, config) {
        console.log('Error while getting stage in MultipleStageChangeController');
      }

    }
  }
})();
