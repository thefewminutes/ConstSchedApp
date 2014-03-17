'use strict';

angular.module('constrSchedApp', [
  'ngRoute',
  'constrSchedApp.filters',
  'constrSchedApp.services',
  'constrSchedApp.directives',
  'constrSchedApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'jobList'});
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);