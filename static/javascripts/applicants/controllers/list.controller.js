(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantListController', ApplicantListController);

  ApplicantListController.$inject = ['$location', '$routeParams', '$scope', 'Applicants', 'Stages'];

  function ApplicantListController($location, $routeParams, $scope, Applicants, Stages) {
    var vm = this;

    vm.applicants = [];

    vm.stages = [];

    vm.id = $routeParams.id;

    activate();

    function activate() {
      Applicants.all(vm.id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      $scope.$on('applicant.created', function(event, applicant) {
        vm.applicants.unshift(applicant);
      });

      $scope.$on('applicant.created.error', function() {
        vm.applicants.shift();
      });

      Stages.all(vm.id)
        .then(stagesGetSuccessFn, stagesGetErrorFn);

      function stagesGetSuccessFn(data, status, headers, config) {
        vm.stages = data.data;
      }

      function stagesGetErrorFn(data, status, headers, config) {
        console.log('Error while fetching stages in ApplicantListController');
      }

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get function in ApplicantListController');
      }
    }
  }
})();
