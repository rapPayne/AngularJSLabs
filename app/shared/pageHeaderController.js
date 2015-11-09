(function () {
  'use strict';
  angular.module('sharedModule')
    .controller('pageHeaderController',pageHeaderController);
  pageHeaderController.$inject=['$scope', 'cartService'];
  function pageHeaderController($scope, cartService) {
    $scope.cart = cartService.cart;
  }
})();