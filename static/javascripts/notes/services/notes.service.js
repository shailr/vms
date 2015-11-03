(function () {
  'use strict';

  angular
    .module('vms.notes.services')
    .factory('Notes', Notes);

  function Notes() {
    var Notes = {
      test: test
    };

    return Notes;

    function test() {
      console.log('successful');
    }
  }
})();
