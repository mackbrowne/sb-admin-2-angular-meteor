/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
	.directive('timeline', [function() {
    return {
      templateUrl: 'client/core/directives/timeline/timeline.html',
      restrict: 'E',
      replace: true
    };
  }]);
