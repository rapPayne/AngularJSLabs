(function () {
  'use strict'
  angular.module("sharedModule")
    .service("categoryService",categoryService);
  categoryService.$inject = ['$http'];

  function categoryService($http) {
    this.getAllCategories = function () {
      return $http({
        url: "/api/category",
        method: "GET"
      });
    };
    this.getCategory = function (categoryID) {
      return $http({
          url: "/api/category/" + categoryID,
          method: "GET"
        });
    };
  }

})();