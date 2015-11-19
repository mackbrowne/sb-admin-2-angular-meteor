'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
	.directive('chat',function(){
		return {
        templateUrl:'client/core/directives/chat/chat.html',
        restrict: 'E',
        replace: true
    	}
	});


