(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('NewTagController', NewTagController);

  NewTagController.$inject = ['$location', '$routeParams', 'Applicants', 'Tags', 'History'];

  function NewTagController($location, $routeParams, Applicants, Tags, History) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.app_id = $routeParams.app_id;

    vm.tag = undefined;

    vm.applicant = undefined;

    vm.submit = submit;

    function submit() {
      Applicants.get(vm.id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.applicant = data.data;

        Tags.create(vm.applicant, vm.tag)
          .then(tagCreateSuccessFn, tagCreateErrorFn);

        function tagCreateSuccessFn(data, status, headers, config) {
          console.log('tag created = ', data.data);

          History.create(vm.applicant, "A tag was added at " + data.data.created_at)
            .then(historyCreateSuccessFn, historyCreateErrorFn);

          function historyCreateSuccessFn(data, status, headers, config) {
            console.log('history = ', data.data);
          }

          function historyCreateErrorFn(data, status, headers, config) {
            console.log('History creation failed');
          }
          $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
        }

        function tagCreateErrorFn(data, status, headers, config) {
          console.log('error while creating tag in NewTagController');
          $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
        }
      }

      function applicantGetErrorFn(data, status, headers, config) {
        console.log('Error while fetching applicant');
        $location.url('/applications/' + vm.app_id + '/applicants/' + vm.id);
      }
    }
  }
})();
