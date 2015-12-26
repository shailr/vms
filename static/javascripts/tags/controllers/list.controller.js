(function () {
  'use strict';

  angular
    .module('vms.tags.controllers')
    .controller('TagsListController', TagsListController);

  TagsListController.$inject = ['$http', 'Tags'];

  function TagsListController($http, Tags) {
    var vm = this;

    vm.tags = [];

    Tags.all()
      .then(tagsGetSuccessFn, tagsGetErrorFn);

    function tagsGetSuccessFn(data, status, headers, config) {
      vm.tags = data.data.results;
    }

    function tagsGetErrorFn(data, status, headers, config) {
      console.log('Error while getting tags in TagsListController');
    }
  }
})();
