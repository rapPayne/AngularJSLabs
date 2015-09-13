(function () {
  'use strict'
  angular.module("productModule")
    .service("productService",productService);
  productService.$inject = ['$http'];
  function productService($http) {
    this.getAllProducts = function () {
      return $http({
        url: "/api/product",
        method: "GET"
      });
    }
  }
})();