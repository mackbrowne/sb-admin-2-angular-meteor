/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
  .directive('stats', [function () {
    return {
      templateUrl: 'client/core/directives/dashboard/stats/stats.html',
      restrict: 'E',
      replace: true,
      scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details': '@',
        'type': '@',
        'goto': '@'
      }
    };
  }]);