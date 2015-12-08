(function () {
  'use strict';

  angular
    .module('vms.applicants.controllers')
    .controller('NewApplicantController', NewApplicantController);

  NewApplicantController = ['location', '$routeParams', '$rootScope', '$scope', 'Applicants', 'Applications', 'atomicNotifyService', 'History'];

  function NewApplicantController($location, $routeParams, $rootScope, $scope, Applicants, Applications, atomicNotifyService, History) {
    var vm = this;

    vm.id = $routeParams.id;

    vm.data = {
      address: {},
      birth: {},
      income: {},
      category: {},
      disability: {},
      orphan: {},
      knowledge: {},
	  num_children: 0,
	  children: []
    };

    vm.query = {};
    vm.info = {};

    vm.submit = submit;
    vm.initChildrenData = initChildrenData;

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

          $location.url('/applications/' + vm.id + '/applicants/');
        }

        function createApplicantErrorFn(data, status, headers, config) {
          console.log('MASSIVE THROBBING ERROR IN NEW APPLICANT CONTROLLER');

          console.log('asdasdasdasdadasd', data.data);

          $location.url('/applications/' + vm.id + '/applicants/');
        }
      }

      function ApplicationGetErrorFn(data, status, headers, congfig) {
        console.log('Error in New Applicant Controller from Applicant get function');
      }
    }
  }
})();
