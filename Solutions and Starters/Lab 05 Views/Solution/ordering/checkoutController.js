(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);

  checkoutController.$inject = ['$scope'];

  function checkoutController($scope) {
    var theCart = [
      {
        "product": {
          "productID": 12,
          "productName": "Another fake product",
          "supplierID": 8,
          "categoryID": 3,
          "quantityPerUnit": "Box of 12",
          "unitPrice": 11.23,
          "unitsInStock": 40,
          "unitsOnOrder": 0,
          "reorderLevel": 0,
          "discontinued": 0,
          "featured": true
        },
        "quantity": 4
      },
      {
        "product": {
          "productID": 25,
          "productName": "A fourth fake product",
          "supplierID": 8,
          "categoryID": 4,
          "quantityPerUnit": "Box of 12",
          "unitPrice": 81.34,
          "unitsInStock": 40,
          "unitsOnOrder": 0,
          "reorderLevel": 0,
          "discontinued": 0,
          "featured": true
        },
        "quantity": 2
      },
      {
        "product": {
          "productID": 55,
          "productName": "This hardcoded product",
          "supplierID": 8,
          "categoryID": 4,
          "quantityPerUnit": "A plethora",
          "unitPrice": 44.25,
          "unitsInStock": 40,
          "unitsOnOrder": 0,
          "reorderLevel": 0,
          "discontinued": 0,
          "featured": true
        },
        "quantity": 2
      }
    ];

    $scope.cart = theCart;
    $scope.$watch('cart', function () {
      $scope.cartTotal = getCartTotal($scope.cart);
    }, true);

    $scope.removeFromCart = function (product) {
      console.log("removing product", product);
      $scope.cart.splice($scope.cart.findIndex(p => p.product.productID === product.productID), 1);
    }

    $scope.processOrder = function (cart) {
      while (cart.length) {
        let line = cart.shift();
        console.log("Line ordered", line);
      }
    };
  };

  // A pure and private function.
  function getCartTotal(cart) {
    var subtotal = 0;
    cart.forEach(function (line) {
      subtotal += line.product.unitPrice * line.quantity;
    });
    return subtotal;
  }
})();
