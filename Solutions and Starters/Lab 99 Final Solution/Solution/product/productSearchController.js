(function () {
  angular.module("productModule")
    .controller("productSearchController", productSearchController);
  productSearchController.$inject = ['$scope', 'productService', '$routeParams'];
  function productSearchController($scope, productService, $routeParams) {
    $scope.searchString = $routeParams.searchString;

    productService.getAllProducts()
      .then(function (res) {
      $scope.products = res.data;
    }, function (error) {
      console.error("Error getting all products: "+error.data, error);
    });
  }
})();