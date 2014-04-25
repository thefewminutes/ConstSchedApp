'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Job', ['$resource', function($resource){
	return $resource('../henley/assets/jobs2.json', {}, {
		query: {method:'GET', isArray:false}
	});
}]);