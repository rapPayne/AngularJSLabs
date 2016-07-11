/*
No longer needed.  Replaced by cartFactory.js.  

Some notes:
Using 'self' below because 'this' loses it's identity in inner functions. So we're saving the context, creating a closure.

Why are we setting self.cart.length to 0 and then pushing on 
to it rather than simply going 'self.cart = res.data'? Because 
that would clobber the reference, causing controllers that use 
this service to lose their pointers to the actual cart in
memory.
 */
(function () {
  'use strict';
  angular.module('sharedModule')
    .service('cartService', cartService);
  cartService.$inject = ['$http'];

  function cartService($http) {
    var self=this;
    self.cart = [];

    this.getCart = function () {
      $http.get('/api/cart').then(
        function (res) {
          self.cart.length = 0;
          res.data = res.data || [];
          res.data.forEach(function (line) {
            self.cart.push(line);
          });
          self.cart.subtotal = getSubtotal(self.cart);
        },
        function (error) {
          console.error("Could not read the cart", error);
        }
      );
    };
    this.addToCart = function (product, quantity) {
      return $http({
        method: "POST",
        url: "/api/cart",
        data: {
          "product": product,
          "quantity": quantity
        }
      }).then(
        function (res) {
          self.getCart();
        },
        function (error) {
          console.error("Could not add to the cart", error);
        }
      );
    };
    this.removeFromCart = function (product, quantity) {
      quantity = quantity || "all";
      return $http({
        method: "DELETE",
        url: "/api/cart",
        data: {
          "product": product,
          "quantity": quantity
        },
        headers: {"Content-Type": "application/json;charset=utf-8"}
      }).then(
        function (res) {
          self.getCart();
        },
        function (error) {
          console.error("Could not remove from the cart", error);
        }
      );
    };
    
    this.refreshTotals = function() {
      self.cart.subtotal = getSubtotal(self.cart);
    };

    this.getCart();
  }
  function getSubtotal(cart) {
    var total = 0;
    cart.forEach(function (line) {
      total += line.product.unitPrice * line.quantity;
    });
    return total;
  };
})();