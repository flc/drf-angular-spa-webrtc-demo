'use strict';

angular.module('app')
  .controller('MeCtrl', function ($scope, $rootScope, contentService) {
    contentService.listUser($rootScope.user).success(function(data) {
      $scope.contents = data;
    });
  });
