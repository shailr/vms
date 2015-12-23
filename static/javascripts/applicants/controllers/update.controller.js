(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('UpdateApplicantController', UpdateApplicantController);

  UpdateApplicantController.$inject = ['$routeParams', '$rootScope', '$scope', '$location', 'Applicants', 'History', 'Calls', 'Locations'];

  function UpdateApplicantController($routeParams, $rootScope, $scope, $location, Applicants, History, Calls, Locations) {
    var vm = this,
        id = $routeParams.id,
        app_id = $routeParams.app_id;

    vm.data = undefined;
    vm.query = undefined;
    vm.info = undefined;
    vm.ratings = [1, 2, 3, 4, 5];
    vm.rating = 0;
    vm.is_disabled = false;

    $scope.areas = [];

    $scope.updateLocations = function (typed) {
      if (typed.length >= 3) {
        Locations.like(typed)
          .then(locationsGetSuccessFn, locationsGetErrorFn);
      }
    }

    $scope.locationSelected = function (location) {
      var addresses = location.split('><');

      vm.data.data.address.area = addresses[0];
      vm.data.data.address.locality = addresses[1];
      vm.data.data.address.constituency = addresses[2];
    }

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

    function locationsGetSuccessFn(data, status, headers, config) {
      var areas = data.data;

      $scope.areas = [];

      for (var area in areas) {
        $scope.areas.push(areas[area].address);
      }
    }

    function locationsGetErrorFn(data, status, headers, config) {
      console.log('Error in getting locations in ApplicantUpdateController');
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

      function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

      function callUpdateSuccessFn(data, status, headers, config) {
        console.log('call update', data.data);
        var start = new Date(data.data.start_time),
            end = new Date(data.data.end_time);

        History.create(vm.data, 'A new call of duration ' + millisToMinutesAndSeconds(end - start) + ' was made');
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
