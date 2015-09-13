/**
 * Created by rap on 9/13/15.
 */
(function () {
  angular.module("productModule")
    .controller("productController", productController);
  productController.$inject = ['$scope', 'productService'];
  function productController($scope, productService) {
    productService.getAllProducts()
      .then(function (res) {
      $scope.products = res.data;
    }, function (error) {
      console.error("Error getting the list of products: "+error.data, error);
    });
    console.log($scope.products);
  }
})();