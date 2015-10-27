(function () {
  angular.module("productModule")
    .controller("productDetailController", productDetailController);
  productDetailController.$inject = ['$scope', 'productService', 'categoryService', 'cartService', '$routeParams', '$window'];

  function productDetailController($scope, productService, categoryService, cartService, $routeParams, $window) {
    $scope.quantity = 1;
    var productID = $routeParams.productID;
    //TODO: Display category *name*, not categoryID. Will need to look it up.
    productService.getProduct(productID)
      .then(function (res) {
        $scope.product = res.data;
        categoryService.getCategory($scope.product.categoryID)
          .then(function (res) {
            $scope.categoryName = res.data.categoryName
          }, function (error) {
            console.error("Error getting product: "+error.data, error);
          });

      }, function (error) {
        console.error("Error getting product: "+error.data, error);
      });

    $scope.addToCart = function(product, quantity) {
      console.log("Adding quanitity " + quantity + " of " + product.productName + " to the cart.");
      cartService.addToCart(product, quantity).then(
        function (data) {
          console.log("Added to cart", data);
        },
        function (err) {
          console.error("Error adding to cart", err);
        }
      );
    };

    $scope.goBack = function() {
      $window.history.back();
    }
  }
})();