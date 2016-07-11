/*
Some notes:
Using 'self' below because 'this' loses it's identity in inner functions. So we're saving the context, creating a closure.
 */
(function () {
  'use strict';
  angular.module('sharedModule').factory('cartFactory', cartFactory);

  cartFactory.$inject = ['$http'];

  function cartFactory($http) {
    var self = this;
    self.cart = [];

    function removeFromCart(product) {
      return $http({
          url: "/api/cart",
          method: 'DELETE',
          data: {
            product: product
          },
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function () {
          self.cart.splice(self.cart.findIndex((line) => line.product.productID === product.productID), 1);
          self.cart.subtotal = calculateSubtotal(self.cart);
        }, function (error) {
          console.error('Product not removed from cart.', error);
        });
    }

    function addToCart(product, quantity) {
      return $http({
          url: "/api/cart",
          method: 'POST',
          data: {
            product: product,
            quantity: quantity
          }
        })
        .then(function () {
          self.cart.push({
            product: product,
            quantity: quantity
          });
          self.cart.subtotal = calculateSubtotal(self.cart);
        }, function (error) {
          console.error('Product not have been added.', error);
        });
    }

    // Run only once ... when the factory is created by Angular. Note that it fails silently.
    if (!self.cart.length) {
      $http({
        url: '/api/cart'
      }).then(function (res) {
        res.data.forEach(function (line) {
          self.cart.push(line);
          self.cart.subtotal = calculateSubtotal(self.cart);
        })
      });
    }

    return {
      cart: self.cart,
      addToCart: addToCart,
      removeFromCart: removeFromCart
    };

    // A pure and private function, not exposed to the factory.
    function calculateSubtotal(cart) {
      var subtotal = 0;
      cart.forEach(function (line) {
        subtotal += line.product.unitPrice * line.quantity;
      });
      return subtotal;
    }
  }
})();
