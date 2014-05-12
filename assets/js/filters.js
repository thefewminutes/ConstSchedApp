'use strict';

/* Filters */

// pagination filter
angular.module('constrSchedApp.filters', []).
  filter('pagination', function(){
    return function(inputArray, selectedPage, itemsPerPage) {
        var start = (selectedPage-1)*itemsPerPage;
		return inputArray.slice(start, start + itemsPerPage);
	}
  });