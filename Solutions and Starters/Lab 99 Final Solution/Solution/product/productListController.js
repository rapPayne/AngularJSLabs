(function () {
  angular.module("productModule")
    .controller("productListController", productListController);

  productListController.$inject = ['$scope', 'productService', 'categoryService', '$routeParams'];

  function productListController($scope, productService, categoryService, $routeParams) {
    $scope.categoryID = $routeParams.categoryID;
    categoryService.getAllCategories().then(function (res) {
      $scope.categories = res.data;
      $scope.category = $scope.categories.filter(function (cat) {
        if (cat.categoryID == $scope.categoryID)
          return cat;
      })[0];
    });

    productService.getAllProducts()
      .then(function (res) {
        $scope.products = res.data;
      }, function (error) {
        console.error("Error getting all products: " + error.data, error);
      });
  }
})();
