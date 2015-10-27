(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('checkoutController', checkoutController);
  checkoutController.$inject = ['$scope', 'cartService'];
  function checkoutController($scope, cartService) {
    var cart = cartService.getCart().then(
      function (response) {
        $scope.cart = response.data;
        console.log(response.data);
      },
      function (error) {
        console.error(error);
      }
    );

  }
})();