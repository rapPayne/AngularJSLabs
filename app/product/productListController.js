(function () {
  angular.module("productModule")
    .controller("productListController", productListController);
  productListController.$inject = ['$scope', 'productService', 'categoryService', '$routeParams'];
  function productListController($scope, productService, categoryService, $routeParams) {
    $scope.categories = $routeParams.categoryID;
    console.log($routeParams, $scope.categoryID);
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