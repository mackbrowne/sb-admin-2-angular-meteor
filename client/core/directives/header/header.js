'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('socially')
	.directive('header',function(){
		return {
        templateUrl:'client/core/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


