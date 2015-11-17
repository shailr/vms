(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantsController', ApplicantsController);

  ApplicantsController.$inject = ['$scope', 'Applicants'];

  function ApplicantsController($scope, Applicants) {
    var vm = this;

    vm.applicants = [];

    vm.toggleStar = toggleStar;

    vm.archive = archive;

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
      var application_id = applicant.application.id;

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
