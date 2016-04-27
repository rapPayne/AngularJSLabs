(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);
  checkoutController.$inject = ['$scope', 'cartService'];

  function checkoutController($scope, cartService) {
    $scope.cart = cartService.cart;
    $scope.$watch('cart', function () {
      cartService.refreshTotals();
    }, true);
    $scope.removeFromCart = function (product) {
      cartService.removeFromCart(product).then(
        function () {
          console.log("removed from cart.", product);
        },
        function (error) {
          console.error(error);
        }
      );
    }

    $scope.placeOrder = function () {
      $scope.cart.forEach(function (line) {
        cartService.removeFromCart(line.product).then(function () {
          console.log("Line ordered:", line);
        }, function (error) {
          console.error("Couldn't remove ", line);
        });
      });
    };
  }

})();
