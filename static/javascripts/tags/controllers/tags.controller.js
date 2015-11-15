(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('TagsController', TagsController);

  TagsController.$inject = ['$scope'];

  function TagsController($scope) {
    var vm = this;

    vm.tags = [];

    activate();

    function activate() {
      $scope.$watchCollection(function () { return $scope.tags; }, render);
    }

    function render(current, original) {
      if (current != original) {
        vm.tags = [];

        for (var i = 0; i < current.length; i++) {
          vm.tags.push(current[i]);
        }
      }
    }
  }
})();
