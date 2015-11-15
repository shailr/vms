(function () {
  'use strict';

  angular
    .module('vms.inboxmessages.services')
    .factory('InboxMessages', InboxMessages);

  InboxMessages.$inject = ['$http'];

  function InboxMessages($http) {
    var InboxMessages = {
      all: all,
      create: create,
      update: update
    };

    return InboxMessages;

    function all(id) {
      return $http.get('/api/v1/accounts/' + id + '/inboxmessages/');
    }

    function create(applicant, message, user) {
      return $http.post('/api/v1/inboxmessages/', {
        applicant: applicant,
        message: message,
        user: user
      });
    }

    function get(id) {
      return $http.get('/api/v1/inboxmessages/' + id + '/');
    }

    function update(inboxmessage) {
      return $http.put('/api/v1/inboxmessages/' + inboxmessage.id + '/', inboxmessage);
    }
  }
})();
