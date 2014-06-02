'use strict';

angular.module('constrSchedApp', [
  'ngRoute',
  'constrSchedApp.filters',
  'appServices',
  'constrSchedApp.directives',
  'appControllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/dashboard', {
		templateUrl: 'partials/dashboard.html', 
		controller: 'jobListCtrl'
	}).
	when('/job-responsible/:jobId', {
		templateUrl: 'partials/job-responsible.html', 
		controller: 'jobResponsibleCtrl'
	}).
	otherwise({
		redirectTo: '/dashboard'
	});
}]);