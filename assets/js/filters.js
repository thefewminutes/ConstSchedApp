'use strict';

/* Filters */

// pagination filter
angular.module('constrSchedApp.filters', []).
  filter('pagination', function(){
    return function(inputArray, selectedPage, pageSize) {
        var start = selectedPage*pageSize;
		return inputArray.slice(start, start + pageSize);
	}
  });