'use strict';

/* Services */


angular.module('myApp.services', []).
  factory( 'TagService', ['$resource', function($resource){
    return $resource('/api/v1.0/tag/:id', {id: '@id'});
  }])
  .factory( 'DocumentService', ['$resource', function($resource){
    return $resource('/api/v1.0/document/:id', {id: '@id'});
  }])
  .factory( 'DocumentMLTService', ['$resource', function($resource){
    return $resource('/api/v1.0/document/:id/mlt', {id: '@id'});
  }])
  .factory( 'SearchService', ['$resource', function($resource){
    var resource = $resource('/api/v1.0/document/search');
    // Set the defaults for the cached search settings
    var current = {query: '', per_page: 25, page: 1, reverse: false};
    return {
      search: function(newRequest){
        current = newRequest;
        return resource.get(current);
      },
      cached: function(){
        return current;
      },
    }
  }])
  .factory( 'PagesService', [function(){
      return {
          pages: function(){
            return [
              { name:"Documents", url:"#/document" },
              { name:"Tags", url:"#/tag" },
              { name:"Search", url:"#/search"},
            ];
          }
      }
  }]);
