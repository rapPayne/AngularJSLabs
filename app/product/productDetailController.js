(function () {
  angular.module("productModule")
    .controller("productDetailController", productDetailController);
  productDetailController.$inject = ['$scope', 'productService', 'categoryService', '$routeParams', '$window'];

  function productDetailController($scope, productService, categoryService, $routeParams, $window) {
    $scope.quantity = 1;
    var productID = $routeParams.productID;
    //TODO: Display category *name*, not categoryID. Will need to look it up.
    productService.getProduct(productID)
      .then(function (res) {
        $scope.product = res.data;
        categoryService.getCategory($scope.product.productID)
          .then(function (res) {
            $scope.categoryName = res.data.categoryName
          }, function (error) {
            console.error("Error getting product: "+error.data, error);
          });

      }, function (error) {
        console.error("Error getting product: "+error.data, error);
      });


    $scope.addToCart = function(product, quantity) {
      //TODO: Add a dependency on a cartService.
      //TODO: Make sure product is a product and quantity is a number
      console.log("Adding quanitity " + quantity + " of " + product.productName + " to the cart.");
      //TODO: Actually add it to a cart object in local storage.
    };

    $scope.goBack = function() {
      $window.history.back();
    }
  }
})();