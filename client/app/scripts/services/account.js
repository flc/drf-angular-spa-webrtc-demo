'use strict';

angular.module('app')
  .service('accountService', function($http, $rootScope, $location) {

    var doPost = function(url, params, errors) {

      return $http.post($rootScope.API_BASE_URL + url, params)
        .error(function(response, status, headers, config) {
          $rootScope.handleErrors(response, status, errors);
        });
    };

    return {

        signin: function(params, errors) {
          return doPost('account/signin/', params, errors).success(function() {
            $rootScope.setCurrentUser();
          });
        },

        signup: function(params, errors) {
          return doPost('account/signup/', params, errors).success(function() {
            $rootScope.setCurrentUser();
          });
        },

        signout: function() {
          return $http.post($rootScope.API_BASE_URL + 'account/signout/').success(function() {
            $rootScope.setCurrentUser();
            $location.path('/account/signin');
          });
        }

      };
  });
