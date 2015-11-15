(function () {
  'use strict';

  angular
    .module('vms.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/settings', {
      templateUrl: '/static/templates/authentication/settings.html'
    }).when('/settings/profile', {
      controller: 'UpdateAccountController',
      controllerAs:'vm',
      templateUrl: '/static/templates/authentication/update-account.html'
    }).when('/inbox', {
      controller: 'InboxMessagesListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/inboxmessages/message-list.html'
    }).when('/applications', {
      controller: 'ApplicationsDashboardController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applications/dashboard.html'
    }).when('/applications/:id', {
      controller: 'ApplicationDetailController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applications/detail.html'
    }).when('/applications/:id/stages', {
      controller: 'StageListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stages/stage-list.html'
    }).when('/applications/:id/stages/new', {
      controller: 'NewStageController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/stages/new-stage.html'
    }).when('/applications/:id/applicants/new', {
      controller: 'NewApplicantController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/new-applicant.html'
    }).when('/applications/:app_id/applicants/:id/update', {
      controller: 'UpdateApplicantController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/update-applicant.html'
    }).when('/applications/:app_id/applicants/:id', {
      controller: 'ApplicantDetailController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/detail.html'
    }).when('/applications/:id/applicants', {
      controller: 'ApplicantListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/applicant-list.html'
    }).when('/applications/:app_id/applicants/:id/tags/new', {
      controller: 'NewTagController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/tags/new-tag.html'
    }).when('/applications/:app_id/tags/:tag_id/applicants', {
      controller: 'TagApplicantsListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/tags/tag-applicants-list.html'
    }).when('/applications/:app_id/applicants/:id/notes/new', {
      controller: 'NewNoteController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/notes/new-note.html'
    }).when('/applications/:app_id/applicants/:id/messages/new', {
      controller: 'NewMessageController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/messages/new-message.html'
    }).when('/applications/:app_id/applicants/:id/todos/new', {
      controller: 'NewTodoController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/todos/new-todo.html'
    }).when('/stages/:stage_id/applicants', {
      controller: 'StageApplicantsListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/stage-applicants-list.html'
    }).when('/dashboard', {
      controller: 'DashboardController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/dashboard.html'
    }).when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    }).otherwise('/');
  }
})();
