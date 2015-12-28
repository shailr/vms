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

    vm.users = {
      "1": "Ashwin Dubey",
      "2": "Muniraj Sisodia",
      "3": "Mahender Singh",
      "4": "Sandeep Sisodia",
      "5": "Shailesh Yadav"
    };

    vm.stage_names = {
      "1": "Incoming",
      "2": "Calling",
      "3": "Eligible - documentation",
      "4": "Eligible - Application",
      "5": "Admitted",
      "6": "Ineligible applicant",
      "7": "Call Done - Not responsding",
      "8": "Call Done - Call cut",
      "9": "Call Done - Volunteer/NGO",
      "10": "EWS Last Year",
      "11": "Wrong no - No child",
      "12": "Wrong no - Did not call",
      "13": "Call Done - Switched off",
      "14": "Call Done - Not reachable",
      "15": "Call Done - Busy",
      "16": "Community Champ"
    };

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
          vm.applicants.previous = vm.applicants.previous.replace('127.0.0.1:8000', '52.26.182.226')
        }

        if (vm.applicants.next) {
          vm.applicants.next = vm.applicants.next.replace('api/v1/', '');
          vm.applicants.next = vm.applicants.next.replace('/?', '?');
          vm.applicants.next = vm.applicants.next.replace('127.0.0.1:8000', '52.26.182.226')
          console.log(vm.applicants.next);
        }
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get function in ApplicantListController');
      }
    }
  }
})();
