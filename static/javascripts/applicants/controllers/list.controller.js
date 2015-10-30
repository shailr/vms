(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantListController', ApplicantListController);

  ApplicantListController.$inject = ['$location', '$routeParams', '$scope', 'Applicants'];

  function ApplicantListController($location, $routeParams, $scope, Applicants) {
    var vm = this;

    vm.applicants = [];

    activate();

    function activate() {
      var id = $routeParams.id;

      Applicants.all(id)
        .then(applicantListSuccessFn, applicantListErrorFn);

      $scope.$on('applicant.created', function(event, applicant) {
        vm.applicants.unshift(applicant);
      });

      $scope.$on('applicant.created.error', function() {
        vm.applicants.shift();
      });

      function applicantListSuccessFn(data, status, headers, config) {
        vm.applicants = data.data;
      }

      function applicantListErrorFn(data, status, headers, config) {
        console.log('Error in Applicant get function in ApplicantListController');
      }
    }
  }
})();
