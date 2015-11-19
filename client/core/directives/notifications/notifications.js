'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
	.directive('notifications',function(){
		return {
        templateUrl:'client/core/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


