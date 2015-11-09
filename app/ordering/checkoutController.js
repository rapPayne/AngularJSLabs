(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);
  checkoutController.$inject = ['$scope', 'cartService'];
  function checkoutController($scope, cartService) {
    $scope.cart = [];
    $scope.$watch('cart', function (oldCart, newCart) {
      console.log(oldCart, newCart);
      $scope.cartTotal = getCartTotal(newCart);
    });
    cartService.getCart().then(
      function (response) {
        $scope.cart = response.data || [];
      },
      function (error) {
        console.error(error);
      }
    );
    $scope.removeFromCart = function (product) {
      cartService.removeFromCart(product).then(
        function (response) {
          console.log("removed from cart:", response);
          $scope.cart = response.data || [];
        },
        function (error) {
          console.error(error);
        }
      );
    }
  }

  function getCartTotal(cart) {
    var total = 0;
    cart.forEach(function (line) {
      total += line.product.unitPrice * line.quantity;
    });
    return total;
  }
})();