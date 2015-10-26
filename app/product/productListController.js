(function () {
  angular.module("productModule")
    .controller("productListController", productListController);
  productListController.$inject = ['$scope', 'productService', 'categoryService', '$routeParams'];
  function productListController($scope, productService, categoryService, $routeParams) {
    categoryService.getAllCategories().then(function (res) {
        $scope.categories = res.data;
      }
    );

    productService.getAllProducts()
      .then(function (res) {
      $scope.products = res.data;
    }, function (error) {
      console.error("Error getting all products: " + error.data, error);
    });
  }
})();