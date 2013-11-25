'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', ['$scope', 'PagesService', function($scope, PagesService) {
    $scope.pages = PagesService.pages()
  }])
  .controller('DocumentListCtrl', ['$scope', 'DocumentService', function($scope, DocumentService) {
    // TODO - Paginate Currently we can only get the first 25 docs
    $scope.type = 'document';
    $scope.results = DocumentService.get();
  }])
  .controller('DocumentCtrl', ['$scope', '$routeParams', 'DocumentService', function($scope, $routeParams, DocumentService) {
    $scope.doc = DocumentService.get({id:$routeParams.id});
  }])
  .controller('DocumentMLTCtrl', ['$scope', '$routeParams', 'DocumentMLTService', 'DocumentService', function($scope, $routeParams, DocumentMLTService, DocumentService) {
    $scope.doc = DocumentService.get({id:$routeParams.id});
    $scope.results = DocumentMLTService.get({id:$routeParams.id});
  }])
  .controller('DocumentAddCtrl', ['$scope','$location', 'DocumentService', function($scope, $location, DocumentService) {
    $scope.add = function(){
      DocumentService.save($scope.doc);
      $location.path('/document/');
    };
  }])
  .controller('TagListCtrl', ['$scope', 'TagService', function($scope, TagService) {
    // TODO - Paginate Currently we can only get the first 25 tags
    $scope.type = 'tag';
    $scope.results = TagService.get();
  }])
  .controller('TagCtrl', ['$scope','$routeParams', 'TagService', function($scope, $routeParams, TagService) {
    $scope.tag = TagService.get({id:$routeParams.id});
  }])
  .controller('TagAddCtrl', ['$scope','$location', 'TagService', function($scope, $location, TagService) {
    $scope.add = function(){
      TagService.save($scope.tag);
      $location.path('/tag/');
    };
  }])
  .controller('SearchCtrl', ['$scope','$timeout', 'SearchService', function($scope, $timeout, SearchService) {
    $scope.type = 'document';
    $scope.currentData = SearchService.cached();
  
    $scope.nextPage = function(){
      if ($scope.hasNext()){
        $scope.currentData.page++;
      }
    };
  
    $scope.prevPage= function(){
      if ($scope.hasPrev()){
        $scope.currentData.page--;
      }
    };

    $scope.hasNext = function(){
      if ($scope.results && $scope.results.meta){
        return ($scope.currentData.page < $scope.results.meta.pages);
      }
      else {
        return false;
      }
    }
  
    $scope.hasPrev = function(){
      return ($scope.currentData.page > 1);
    }
  
    var searchTimeout;
    $scope.$watchCollection('currentData', function(){
      if (searchTimeout){
        $timeout.cancel(searchTimeout);
      }
      searchTimeout = $timeout(function(){
        if ($scope.currentData.query && $scope.currentData.query.length > 2){
            $scope.results = SearchService.search($scope.currentData);
        };
      }, 250);
      /* 250 milliseconds seems optimum. It is short enough that the user
       * doesn't realise there is a delay and long enough that the server
       * doesn't get hammered.
       */
    });
  
  }]);

