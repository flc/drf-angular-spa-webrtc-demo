'use strict';

angular.module('app')

.controller('CreateCtrl', function ($scope, $location, $routeParams, contentService, instance) {
  $scope.form = {};
  $scope.errors = {};

  if (instance) {  // edit form
    instance = instance.data;
    $scope.instance = instance;
    // set form initials
    $scope.form.title = instance.title;
    $scope.form.description = instance.description;
  }

  $scope.submitForm = function() {
    $scope.errors = {};
    if (instance) {
      return contentService.edit(instance.id, $scope.form, $scope.errors).success(function() {
        $location.path('/me');
      });
    } else {
      return contentService.create($scope.form, $scope.errors).success(function() {
        $location.path('/me');
      });

    }

  };

});
