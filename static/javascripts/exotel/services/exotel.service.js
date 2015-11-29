(function () {
  'use strict';

  angular
    .module('vms.exotel.services')
    .factory('Exotel', Exotel);

  function Exotel($http, Applicants) {
    var Exotel = {
      sendMessage: sendMessage,

    };
  }
})();
