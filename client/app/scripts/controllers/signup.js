'use strict';

angular.module('app')
  .controller('SignupCtrl', function ($scope, $location, accountService) {
    $scope.submitForm = function() {
      $scope.errors = {};
      return accountService.signup($scope.form, $scope.errors).success(function() {
        $location.path('/');
        // change URL without creating a new browser history record
        $location.replace();
      });
    };
  });
