'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Job', ['$resource', function($resource){
	return $resource('../henley/assets/json/Jobs.json', {}, {
		query: {method:'GET', isArray:false}
	});
}]);