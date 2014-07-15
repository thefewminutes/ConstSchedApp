'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('jobListCtrl', ['$scope', 'Job', '$route', function($scope, Job, $route) {
	
	// get all the jobs from the Job service
	$scope.loading = true;
	$scope.httpError = false;
	$scope.jobs = Job.query(); // create Job service
	$scope.jobs.$promise.then(function (result) {
		// successCallback
		$scope.loading = false;
    	$scope.jobs = result;
	},function (reason) {
		// errorCallback
		$scope.loading = false;
		$scope.httpError = true;
		$scope.errorStatus = reason.status;
		switch (reason.status) {
				case 404:
					$scope.errorInfo = 'The requested resource could not be found.';
					break;
				case 500:
					$scope.errorInfo = 'Internal server error. No more information is available.';
					break;
				default:
					$scope.errorInfo = 'An error has occurred.';
					break;
		};
	});
	
	// reload the page
	$scope.reloadPage = function () {
		$route.reload();
	};
	
	// sorting
	$scope.sortField = undefined;
	$scope.reverse = false;
	$scope.sort = function (fieldName) { 
		if ($scope.sortField === fieldName) {
			$scope.reverse = !$scope.reverse;
			console.log($scope.sortField);
		} else { 
			$scope.sortField = fieldName; 
			$scope.reverse = false;
			console.log($scope.sortField);
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
	$scope.maxSize = 3; // number of pagination page numbers to display
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
			window.open('http://maps.google.com.au/?q=' + location);
		} else {
			alert('No Location Data');
		};
	};
}]);

appControllers.controller('jobResponsibleCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('../henley/assets/json/jobs/' + $routeParams.jobId + '.json').success(function(data) {
      $scope.job = data;
	  $scope.currentJob = $scope.job.JobList[0];
    }).error(function(data) {
		alert('no data for this job');
	});
		// get the docs for the current job
	$http.get('../henley/assets/json/docs/' + $routeParams.jobId + '.json').success(function(data) {
		$scope.docs = data;
	}).error(function(data) {
		alert('no docs data for this job');
	});
	$scope.showMap = function(location) { // display location in new window on google maps
		if(location){
			window.open('http://maps.google.com.au/?q=' + location);
		} else {
			alert('No Location Data');
		};
	};
  }]);
  
	appControllers.controller('jobDocumentsCtrl', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http) {
		// get the current job
		$http.get('../henley/assets/json/jobs/' + $routeParams.jobId + '.json').success(function(data) {
			$scope.job = data;
			$scope.currentJob = $scope.job.JobList[0];
		}).error(function(data) {
			alert('no data for this job');
		});
		// get the docs for the current job
		$http.get('../henley/assets/json/docs/' + $routeParams.jobId + '.json').success(function(data) {
			$scope.docs = data;
		}).error(function(data) {
			alert('no docs data for this job');
		});
		$scope.showMap = function(location) { // display location in new window on google maps
			if(location){
				window.open('http://maps.google.com.au/?q=' + location);
			} else {
				alert('No Location Data');
			};
		};
	}]);

	appControllers.controller('jobPoCtrl', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http) {
		$http.get('../henley/assets/json/jobs/' + $routeParams.jobId + '.json').success(function(data) {
			$scope.job = data;
			$scope.currentJob = $scope.job.JobList[0];
		}).error(function(data) {
			alert('no data for this job');
		});
		// get the docs for the current job
		$http.get('../henley/assets/json/docs/' + $routeParams.jobId + '.json').success(function(data) {
			$scope.docs = data;
		}).error(function(data) {
			alert('no docs data for this job');
		});
		$scope.showMap = function(location) { // display location in new window on google maps
			if(location){
				window.open('http://maps.google.com.au/?q=' + location);
			} else {
				alert('No Location Data');
			};
		};
		
		// action buttons
		$scope.canSave = false;
		$scope.submitterClass = "btn btn-default";
		$scope.actionIconClass = "";
		$scope.selectedAction = "Select Action";
		$scope.selectAction = function(action) {
			switch (action) {
				case 'Select Action':
					$scope.canSave = false;
					$scope.submitterClass = "btn btn-default";
					$scope.actionIconClass = "";
					break;
				case 'Email Purchase Orders':
					$scope.canSave = true;
					$scope.submitterClass = "btn btn-primary";
					$scope.actionIconClass = "glyphicon glyphicon-envelope";
					break;
				case 'Print Purchase Orders':
					$scope.canSave = true;
					$scope.submitterClass = "btn btn-primary";
					$scope.actionIconClass = "glyphicon glyphicon-print";
					break;
			};
			$scope.selectedAction = action;
		};
		
	}]);
  
	appControllers.controller('NavController', function ($scope, $location) {
		$scope.isCollapsed = true;
		$scope.$on('$routeChangeSuccess', function () {
			$scope.isCollapsed = true;
		});
		
		$scope.getClass = function (path) {
			if(path === '/') {
				if($location.path() === '/') {
					return "active";
				} else {
					return "";
				}
			}
		
			if ($location.path().substr(0, path.length) === path) {
				return "active";
			} else {
				return "";
			}
		}
	});