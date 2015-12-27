(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantsController', ApplicantsController);

  ApplicantsController.$inject = ['$rootScope', '$scope', 'Applicants'];

  function ApplicantsController($rootScope, $scope, Applicants) {
    var vm = this;

    vm.applicants = [];

    $rootScope.selected_items = [];

    vm.toggleStar = toggleStar;

    vm.archive = archive;

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
      $scope.$watchCollection(function () { return $scope.applicants; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.applicants = [];

        for (var i = 0; i < current.length; i++) {
          vm.applicants.push(current[i]);
        }
      }
    }

    function toggleStar(applicant) {
      var application_id = applicant.application;

      applicant.starred = !applicant.starred;

      Applicants.toggleStar(applicant);
    }

    function archive(applicant) {
      var application_id = applicant.application.id;

      applicant.archived = !applicant.archived;

      Applicants.archive(applicant);
    }
  }
})();
