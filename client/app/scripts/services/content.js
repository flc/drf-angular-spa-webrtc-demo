'use strict';

angular.module('app')
  .service('contentService', function($http, $rootScope) {

    return {

        create: function(params, errors) {
          return $http.post($rootScope.API_BASE_URL + 'content/', params, errors)
            .error(function(response, status, headers, config) {
              $rootScope.handleErrors(response, status, errors);
            });
        },

        listAll: function() {
          return $http.get($rootScope.API_BASE_URL + 'content/');
        },

        listUser: function(user) {
          return $http.get($rootScope.API_BASE_URL + 'content/');
        },

        detail: function(contentId) {
          return $http.get($rootScope.API_BASE_URL + 'content/' + contentId + '/');
        },

        delete: function(content) {
          return $http.delete($rootScope.API_BASE_URL + 'content/' + content.id + '/');
        },

        edit: function(contentId, params, errors) {
          return $http.put($rootScope.API_BASE_URL + 'content/' + contentId + '/', params, errors)
            .error(function(response, status, headers, config) {
              $rootScope.handleErrors(response, status, errors);
            });
        }

      };

  });
