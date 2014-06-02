'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('jobListCtrl', ['$scope', 'Job', function($scope, Job) {
	$scope.jobs = Job.query(); // create Job service
	
	// sorting
	$scope.sortField = "JobNumber";
	$scope.reverse = true;
	$scope.sort = function (fieldName) { 
		if ($scope.sortField === fieldName) { 
			$scope.reverse = !$scope.reverse; 
		} else { 
			$scope.sortField = fieldName; 
			$scope.reverse = false;
		}
	};
	
	// sorting visual indicators
	$scope.isSortUp = function (fieldName) {
		return $scope.sortField === fieldName && !$scope.reverse;
	};
	$scope.isSortDown = function (fieldName) {
		return $scope.sortField === fieldName && $scope.reverse;
	};
	
	//pagination
	$scope.pageSize = 10; // number of records to display in table
	$scope.maxSize = 5; // number of pagination page numbers to display
	$scope.pages = [];
	$scope.$watch('filteredJobs.length', function(filteredSize){
		$scope.pages.length = 0;
		var noOfPages = Math.ceil(filteredSize / $scope.pageSize);
		for (var i=0; i<noOfPages; i++) {
			$scope.pages.push(i);
		}
	});
	$scope.pageNo = 1;
	$scope.setPage = function (pageNo) {
		if (pageNo >=0 && pageNo < $scope.pages.length) {
			$scope.pageNo = pageNo;
		}
	};
	$scope.setPageSize = function (size) { // set page size
		$scope.pageSize = size;
	};
	$scope.showMap = function(location) { // display location in new window on google maps
		if(location){
			window.open('http://maps.google.com/?q=' + location);
		} else {
			alert('No Location Data');
		};
	};
}]);