(function () {
  'use strict'
  angular.module('sharedModule')
    .service('cartService', cartService);
  cartService.$inject = ['$http'];
  function cartService($http) {
    this.getCart = function () {
      console.log('getting cart');
      return $http.get('/api/cart');
    };
    this.addToCart = function (product, quantity) {
      return $http({
        method: "POST",
        url: "/api/cart",
        data: {
          "product": product,
          "quantity": quantity
        }
      });
    };
    this.removeFromCart = function (product, quantity) {
      return $http({
        method: "DELETE",
        url: "/api/cart",
        data: {
          "product": product,
          "quantity": quantity
        }
      });
    };
    this.total = function () {
      return 50.34;
    }

  }
})();