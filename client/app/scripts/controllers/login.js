'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, $location, accountService) {
    $scope.errors = {};
    $scope.submitForm = function() {
      $scope.errors = {};
      return accountService.signin($scope.form, $scope.errors).success(function() {
        $location.path('/');
        // change URL without creating a new browser history record
        $location.replace();
      });
    };
  });
