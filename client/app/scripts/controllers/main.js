'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, $rootScope, contentService, _) {

    $scope.deleteContent = function(content) {
      contentService.delete(content).success(function() {
        $scope.contents = _.without($scope.contents, content);
        $rootScope.popToast('success', '\'' + content.title + '\' has been deleted.');
        // $scope.refreshContents();
      });
    };

    $scope.loadContents = function() {
      contentService.listAll($rootScope.user).success(function(data) {
        $scope.contents = data;
      });
    };

    $scope.loadContents();

  });
