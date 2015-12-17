(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('UpdateApplicantController', UpdateApplicantController);

  UpdateApplicantController.$inject = ['$routeParams', '$rootScope', '$location', 'Applicants', 'History', 'Calls'];

  function UpdateApplicantController($routeParams, $rootScope, $location, Applicants, History, Calls) {
    var vm = this,
        id = $routeParams.id,
        app_id = $routeParams.app_id;

    vm.data = undefined;
    vm.query = undefined;
    vm.info = undefined;
    vm.ratings = [1, 2, 3, 4, 5];
    vm.rating = 0;
    vm.is_disabled = false;

    vm.update = update;
    vm.endCall = endCall;
    vm.initChildrenData = initChildrenData;

    vm.relations = ['Mother', 'Father', 'Family (Male)', 'Family (Female)', 'Neighbour/Friend (Male)', 'Neighbour/Friend (Female)'];

    activate();

    function initChildrenData() {
      var prev_length = 0;
      if(vm.data.data.children) {
	prev_length = vm.data.data.children.length;
      }
      else {
	vm.data.data.children = [];
      }
      if(vm.data.data.num_children > prev_length) {
	for(var i = 0; i < (vm.data.data.num_children - prev_length); i++) {
	  vm.data.data.children.push({});
	}
      }
      else if(vm.data.data.num_children < prev_length) {
	vm.data.data.children = vm.data.data.children.slice(0, vm.data.data.num_children);
      }
    }

    function activate() {
      Applicants.get(id)
        .then(applicantGetSuccessFn, applicantGetErrorFn);

      function applicantGetSuccessFn(data, status, headers, config) {
        vm.data = data.data;
        vm.data.data = JSON.parse(vm.data.data);
        vm.data.query = JSON.parse(vm.data.query);
        vm.data.info = JSON.parse(vm.data.info);
      }

      function applicantGetErrorFn(data, status, headers, config) {
        $location.url('/applications/' + app_id + '/applicants');
        console.log('Error while retrieving applicant in UpdateApplicantController');
      }
    }

    function endCall() {
      if($rootScope.current_call) {
        $rootScope.current_call.end = true;
        $rootScope.current_call.rating = vm.rating;

        Calls.update($rootScope.current_call)
          .then(callUpdateSuccessFn, callUpdateErrorFn);
      }

      function callUpdateSuccessFn(data, status, headers, config) {
        console.log('call update', data.data);
        var start = new Date(data.data.start_time),
            end = new Date(data.data.end_time);

        History.create(vm.data, 'A new call of duration ' + (end - start) / 1000 + ' seconds was made');
      }

      function callUpdateErrorFn(data, status, headers, config) {
        console.log('Error while updating call in ApplicantDetailController');
      }
    }


    function update() {
      vm.is_disabled = true;

      Applicants.update(vm.data)
        .then(updateApplicantSuccessFn, updateApplicantErrorFn);

      function updateApplicantSuccessFn(data, status, headers, config) {
        console.log('The Applicant has been updated', data.data);

        History.create(vm.data, 'The applicant was updated');

        $location.url('/applications/' + app_id + '/applicants/' + id);
      }

      function updateApplicantErrorFn(data, status, headers, config) {
        console.log('Error while updating the applicant in UpdateApplicationController');

        $location.url('/applications/' + app_id + '/applicants/' + id);
      }
    }
  }
})();
