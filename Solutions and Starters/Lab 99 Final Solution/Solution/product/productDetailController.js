(function () {
  'use strict';
  angular.module("productModule")
    .controller("productDetailController", productDetailController);
  
  productDetailController.$inject = ['$scope', 'productService', 'categoryService', 'cartFactory', 'notifyFactory', '$routeParams', '$window'];

  function productDetailController($scope, productService, categoryService, cartFactory, notifyFactory, $routeParams, $window) {
    $scope.quantity = 1;
    var productID = $routeParams.productID;
    productService.getProduct(productID)
      .then(function (res) {
        $scope.product = res.data;
        categoryService.getCategory($scope.product.categoryID)
          .then(function (res) {
            $scope.categoryName = res.data.categoryName
          }, function (error) {
            notifyFactory.showError("Oops! Something went wrong. Try again.","Error getting the category");
            console.error("Error getting category: "+error.data, error);
          });
      }, function (error) {
        notifyFactory.showError("Oops! Something went wrong. Try again.","Error getting the product");
        console.error("Error getting product: "+error.data, error);
      });

    $scope.addToCart = function(product, quantity) {
      cartFactory.addToCart(product, quantity).then(
        function () {
          notifyFactory.showSuccess(product.productName + " was added to your cart","Added");
        },
        function (err) {
          notifyFactory.showError("Oops! Something went wrong. Try again.","Error adding to cart");
          console.error("Error adding to cart", err);
        }
      );
    };

    $scope.goBack = function() {
      $window.history.back();
    }
  }
})();