'use strict';

angular.module("myApp", ['ngResource', 'myApp.services', 'myApp.controllers'])
  .config(['$httpProvider', function ($httpProvider) {
  // enable caching of all http requests
  $httpProvider.defaults.cache = true;
  }])
  .config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/static/templates/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/document', {
    templateUrl: '/static/templates/list.html',
    controller: 'DocumentListCtrl'
  });
  $routeProvider.when('/document/add', {
    templateUrl: '/static/templates/new_document.html',
    controller: 'DocumentAddCtrl'
  });
  $routeProvider.when('/document/:id/mlt', {
    templateUrl: '/static/templates/document_mlt.html',
    controller: 'DocumentMLTCtrl'
  });
  $routeProvider.when('/document/:id', {
    templateUrl: '/static/templates/document.html',
    controller: 'DocumentCtrl'
  });
  $routeProvider.when('/search', {
    templateUrl: '/static/templates/search.html',
    controller: 'SearchCtrl'
  });
  $routeProvider.when('/tag', {
    templateUrl: '/static/templates/list.html',
    controller: 'TagListCtrl'
  });
  $routeProvider.when('/tag/add', {
    templateUrl: '/static/templates/new_tag.html',
    controller: 'TagAddCtrl'
  });
   $routeProvider.when('/tag/:id', {
    templateUrl: '/static/templates/tag.html',
    controller: 'TagCtrl'
  });

  $routeProvider.otherwise({ redirectTo : '/' });
}]);
