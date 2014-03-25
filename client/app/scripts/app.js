'use strict';

angular.module('app', [
  'ngRoute',
  'ngCookies',
  'angular-blocks',
  'mgcrea.ngStrap',
  'toaster',
  'chieffancypants.loadingBar',
])

// add LoDash so we can inject it
.constant('_', window._)

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/account/signin', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/account/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/me', {
      templateUrl: 'views/me.html',
      controller: 'MainCtrl'
    })
    .when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl',
      resolve: {
        instance: function() {
          return null;
        }
      }
    })
    .when('/edit/:contentId', {
      templateUrl: 'views/create.html',
      controller: 'CreateCtrl',
      resolve: {
        instance: function($route, contentService) {
          var contentId = $route.current.params.contentId;
          return contentService.detail(contentId);
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
})

.factory('HttpInterceptor', function($q, $location, $rootScope) {
  return {
    response: function (response) {
        if (response.status === 401) {
          $location.path('/account/signin');
        }
        if (response.data.message) {
          $rootScope.serverMessage = response.data.message;
        }
        return response || $q.when(response);
      }
  };
})

.config(function($httpProvider) {
  // adapt to django's default CSRF settings
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';

  // add interceptor
  $httpProvider.interceptors.push('HttpInterceptor');
})

.run(function($rootScope, $log, $http, toaster) {
  $rootScope.API_BASE_URL = '/api/';  // make sure it matches with the proxy config in Gruntfile.js
  $rootScope.dateFormat = 'yyyy-MM-dd HH:mm';

  $rootScope.handleErrors = function(serverResponse, status, errorDestination) {
    if (angular.isDefined(errorDestination)) {
      if (status >= 500) {
        errorDestination.form = 'Server Error: ' + status;
      } else if (status >= 401) {
        errorDestination.form = 'Unauthorized Error: ' + status;
      } else {
        angular.forEach(serverResponse, function(value, key) {
          if (key !== 'non_field_errors') {
            errorDestination[key] = angular.isArray(value) ? value.join('<br/>') : value;
          } else {
            errorDestination.form = errorDestination.form || '' + key + ':' + angular.isArray(value) ? value.join('<br/>') : value;
          }
        });
      }
    }
  };

  $rootScope.user = {};
  $rootScope.setCurrentUser = function() {
    return $http.get($rootScope.API_BASE_URL + 'account/me/').success(function(response) {
      $rootScope.user = response;
    });
  };

  $rootScope.popToast = function(type, title, text) {
    toaster.pop(type, title, text);
  };

  $rootScope.setCurrentUser();
  // window.scope = $rootScope;
})

.controller('HeaderCtrl', function ($scope, $location, accountService) {
  $scope.signOut = function() {
    accountService.signout();
  };

  $scope.isActivePath = function(path) {
    return path === $location.path();
  };

});
