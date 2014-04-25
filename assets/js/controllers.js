'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('jobListCtrl', ['$scope', 'Job', function($scope, Job) {
	$scope.jobs = Job.query(); // create Job service
}]);