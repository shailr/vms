(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('NewApplicantController', NewApplicantController);

  NewApplicantController = ['location', '$routeParams', '$rootScope', '$scope', 'Applicants', 'Applications', 'atomicNotifyService', 'History', 'Locations'];

  function NewApplicantController($location, $routeParams, $rootScope, $scope, Applicants, Applications, atomicNotifyService, History, Locations) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.is_disabled = false;

    vm.data = {
      address: {},
      birth: {},
      income: {},
      category: {},
      disability: {},
      orphan: {},
      num_children: 0,
      children: []
    };

    vm.relations = ['Mother', 'Father', 'Family (Male)', 'Family (Female)', 'Neighbour/Friend (Male)', 'Neighbour/Friend (Female)'];

    vm.query = {};
    vm.info = {};

    $scope.areas = [];

    $scope.updateLocations = function (typed) {
      if (typed.length >= 3) {
        Locations.like(typed)
          .then(locationsGetSuccessFn, locationsGetErrorFn);
      }
    }

    $scope.locationSelected = function (location) {
      var addresses = location.split('><');

      vm.data.address.area = addresses[0];
      vm.data.address.locality = addresses[1];
      vm.data.address.constituency = addresses[2];
    }


    vm.submit = submit;
    vm.initChildrenData = initChildrenData;

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

    function initChildrenData() {
      var prev_length = 0;
      if(vm.data.children) {
	prev_length = vm.data.children.length;
      }
      else {
	vm.data.children = [];
      }
      var prev_length = vm.data.children.length;
      if(vm.data.num_children > prev_length) {
	for(var i = 0; i < (vm.data.num_children - prev_length); i++) {
	  vm.data.children.push({});
	}
      }
      else if(vm.data.num_children < prev_length) {
	vm.data.children = vm.data.children.slice(0, vm.data.num_children);
      }
    }

    function submit() {
      vm.is_disabled = true;

      Applications.get(vm.id)
        .then(ApplicationGetSuccessFn, ApplicationGetErrorFn);

      function ApplicationGetSuccessFn(data, status, headers, config) {
        vm.application = data.data;

        Applicants.create(vm.application, vm.data, vm.query, vm.info)
          .then(createApplicantSuccessFn, createApplicantErrorFn);

        function createApplicantSuccessFn(data, status, headers, config) {
          $rootScope.$broadcast('applicant.created', {
            applicant: data.data,
            data: vm.data
          });

          History.create(data.data, 'An applicant was added');

          atomicNotifyService.success('yay! awesome');

          $location.url('/applications/' + vm.id + '/applicants/' + data.data.id);
        }

        function createApplicantErrorFn(data, status, headers, config) {
          console.log('MASSIVE THROBBING ERROR IN NEW APPLICANT CONTROLLER');

          console.log('asdasdasdasdadasd', data.data);

          $location.url('/applications/' + vm.id + '/applicants/' + data.data.id);
        }
      }

      function ApplicationGetErrorFn(data, status, headers, congfig) {
        console.log('Error in New Applicant Controller from Applicant get function');
      }
    }
  }
})();
