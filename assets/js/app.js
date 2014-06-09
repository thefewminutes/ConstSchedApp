'use strict';

angular.module('constrSchedApp', [
  'ngRoute',
  'constrSchedApp.filters',
  'appServices',
  'constrSchedApp.directives',
  'appControllers',
  'ui.bootstrap',
  'ngAnimate'
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
	when('/job-documents/:jobId', {
		templateUrl: 'partials/job-documents.html', 
		controller: 'jobDocumentsCtrl'
	}).
	otherwise({
		redirectTo: '/dashboard'
	});
}]);