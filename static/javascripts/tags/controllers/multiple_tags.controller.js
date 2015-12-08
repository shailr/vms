(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('MultipleTagsController', MultipleTagsController);

  MultipleTagsController.$inject = ['$location', '$rootScope', 'Tags', 'History'];

  function MultipleTagsController($location, $rootScope, Tags, History) {
    var vm = this;

    vm.tag = undefined;
    vm.submit = submit;
    vm.applicants = $rootScope.selected_items;

    function submit() {
      var count = 0;

      for (var applicant in vm.applicants) {
        Tags.create(vm.applicants[applicant], vm.tag)
          .then(createTagSuccessFn, createTagErrorFn);

        function createTagSuccessFn(data, status, headers, config) {
          History.create(vm.applicants[applicant], 'A tag was created');

          if (++count == vm.applicants.length) {
            $location.url('/applications/1/applicants');
          }
        }

        function createTagErrorFn(data, status, headers, config) {
          if (++count == vm.applicants.length) {
            $location.url('/applications/1/applicants/');
          }

          console.log('Error in create message in MultipleMessagesController');
        }
      }
    }
  }
})();
