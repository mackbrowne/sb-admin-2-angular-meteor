/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('socially')
  .directive('sidebarSearch', [function () {
    return {
      templateUrl: 'client/core/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function ($scope) {
        $scope.selectedMenu = 'home';
      }
    };
  }]);