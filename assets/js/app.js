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
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'jobListCtrl'});
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);