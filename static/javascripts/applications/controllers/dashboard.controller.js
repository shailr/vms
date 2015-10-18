(function () {
  'use strict';

  angular
    .module('vms.applications.controllers')
    .controller('DashboardController', DashboardController);

  function DashboardController($scope, Authentication, Applications) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.applications = [];

    activate();

    function activate() {
      Applications.overview()
        .then(applicationsSuccessFn, applicationsErrorFn);

      $scope.$on('application.created', function(event, application) {
        vm.applications.unshift(application);
      });

      $scope.$on('application.created.error', function () {
        vm.applications.shift();
      });

      function applicationsSuccessFn(data, status, headers, config) {
        vm.applications = data.data;
      }

      function applicationsErrorFn(data, status, headers, config) {
        console.log('MASSIVE THROBBING ERROR IN APPLICATION CREATION');
      }
    }
  }
})();
