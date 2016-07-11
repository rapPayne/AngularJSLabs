(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);
  
  checkoutController.$inject = ['$scope','cartFactory', 'notifyFactory'];

  function checkoutController($scope, cartFactory, notifyFactory) {
    $scope.cart = cartFactory.cart;
    
    $scope.removeFromCart = function (product) {
      console.log("cart", $scope.cart);
      
      cartFactory.removeFromCart(product).then(
        function () {
          notifyFactory.showInfo(product.productName + " was removed from your cart", "Removed");
        },
        function (error) {
          notifyFactory.showError("Error removing that product. Please refresh the page and try again.","Product may still be there");
        }
      );
    }

    $scope.placeOrder = function () {
      $scope.cart.forEach(function (line) {
        cartFactory.removeFromCart(line.product).then(function () {
          console.log("Line ordered:", line);
        }, function (error) {
          console.error("Couldn't remove ", line);
        });
      });
    };
  }

})();
