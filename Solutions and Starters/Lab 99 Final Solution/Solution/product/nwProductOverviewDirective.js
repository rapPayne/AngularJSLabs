(function () {
  'use strict';
  angular.module("productModule")
    .directive("nwProductOverview", nwProductOverviewDirective);

  function nwProductOverviewDirective() {
    return {
      restrict: "E",
      templateUrl: "/app/product/nwProductOverviewPartial.html",
      controller: nwProductOverviewDirectiveController
    };
  }

  nwProductOverviewDirectiveController.$inject = ['$scope', 'cartService', 'notifyFactory'];

  function nwProductOverviewDirectiveController($scope, cartService, notifyFactory) {
    $scope.addToCart = function (product, quantity) {
      cartService.addToCart(product, quantity).then(
        function (data) {
          notifyFactory.showSuccess(product.productName + " was added to your cart", "Added");
        },
        function (err) {
          notifyFactory.showError("Oops! Something went wrong. Try again.", "Error adding to cart");
          console.error("Error adding to cart", err);
        }
      );
    };
  }
})();
