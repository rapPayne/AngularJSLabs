(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);
  checkoutController.$inject = ['$scope', 'cartService'];
  function checkoutController($scope, cartService) {
    $scope.cart = [];
    $scope.$watch('cart', function () {
      $scope.cartTotal = getCartTotal($scope.cart);
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
      console.log("removing " + product);
      cartService.removeFromCart(product).then(
        function (response) {
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