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

    vm.page = 1;

    activate();

    function activate() {
      var page = $location.url();

      if (page.indexOf('=') > -1) {
        page = page.substr(page.indexOf("=") + 1);
        vm.page = page;
      }

      Applicants.all(vm.id, vm.page)
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
        if (vm.applicants.previous) {
          vm.applicants.previous = vm.applicants.previous.replace('api/v1/', '');
          vm.applicants.previous = vm.applicants.previous.replace('/?', '?');
        }

        if (vm.applicants.next) {
          vm.applicants.next = vm.applicants.next.replace('api/v1/', '');
          vm.applicants.next = vm.applicants.next.replace('/?', '?');
        }

        console.log(vm.applicants);
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get function in ApplicantListController');
      }
    }
  }
})();
