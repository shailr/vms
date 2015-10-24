(function () {
  'use strict';

  angular
    .module('vms.applications.controllers')
    .controller('ApplicationDetailController', ApplicationDetailController);

  ApplicationDetailController.$inject = ['$location', '$routeParams', '$scope', 'Applications'];

  function ApplicationDetailController($location, $routeParams, $scope, Applications) {
    var vm = this;

    vm.application = undefined;

    activate();

    function activate() {
      var id = $routeParams.id;

      console.log(id);

      Applications.get(id)
        .then(applicationDetailsSuccessFn, applicationDetailsErrorFn);

      function applicationDetailsSuccessFn(data, status, headers, config) {
        vm.application = data.data;
      }

      function applicationDetailsErrorFn(data, status, headers, config) {
        $location.url('/applications/');
        console.log('MASSIVE THROBBING ERROR IN DETAILS CONTROLLER');o
      }
    }
  }
})();
