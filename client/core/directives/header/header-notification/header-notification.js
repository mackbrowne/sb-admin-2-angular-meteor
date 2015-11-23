/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
  .directive('headerNotification', [function () {
    return {
      templateUrl: 'client/core/directives/header/header-notification/header-notification.html',
      restrict: 'E',
      replace: true,
      controller: function ($meteor) {}
    };
  }]);