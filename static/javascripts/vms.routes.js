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
    }).when('/applications', {
      controller: 'DashboardController',
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
    }).when('/applications/:app_id/applicants/:id', {
      controller: 'ApplicantDetailController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/detail.html'
    }).when('/applications/:id/applicants', {
      controller: 'ApplicantListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/applicants/applicant-list.html'
    }).when('/applicants/:id/notes', {
      controller: 'NoteListController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/notes/note-list.html'
    }).when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    }).otherwise('/');
  }
})();
