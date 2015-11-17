(function () {
  'use strict';

  angular
    .module('vms.message_templates.services')
    .factory('MessageTemplates', MessageTemplates);

  MessageTemplates.$inject = ['$http'];

  function MessageTemplates($http) {
    var MessageTemplates = {
      all: all,
      create: create
    };

    return MessageTemplates;

    function all() {
      return $http.get('/api/v1/message_templates/');
    }

    function create(title, body) {
      return $http.post('/api/v1/message_templates/', {
        title: title,
        body: body
      });
    }
  }
})();
