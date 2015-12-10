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

    vm.update = update;
    vm.endCall = endCall;
    vm.initChildrenData = initChildrenData;

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
      }

      Calls.update($rootScope.current_call)
        .then(callUpdateSuccessFn, callUpdateErrorFn);

      function callUpdateSuccessFn(data, status, headers, config) {
        console.log('call update', data.data);
      }

      function callUpdateErrorFn(data, status, headers, config) {
        console.log('Error while updating call in ApplicantDetailController');
      }
    }


    function update() {
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
