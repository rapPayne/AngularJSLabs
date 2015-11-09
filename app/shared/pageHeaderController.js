(function () {
  'use strict';
  angular.module('sharedModule')
    .controller('pageHeaderController',pageHeaderController);
  pageHeaderController.$inject=['$scope', 'cartService'];
  function pageHeaderController($scope, cartService) {
    $scope.cart = cartService.cart;
    //cartService.getCart();
//      .then(
//      function (response) {
//        $scope.cart = response.data;
//      },
//      function (error) {
//        console.error("Error getting cart in pageHeader.", error);
//      }
//    );
  }
})();