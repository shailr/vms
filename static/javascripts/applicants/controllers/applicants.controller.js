(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('ApplicantsController', ApplicantsController);

  function ApplicantsController($scope) {
    var vm = this;

    vm.applicants = [];

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
  }
})();
