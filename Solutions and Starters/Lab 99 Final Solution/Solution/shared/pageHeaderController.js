(function () {
  'use strict';
  angular.module('sharedModule')
    .controller('pageHeaderController',pageHeaderController);
  pageHeaderController.$inject=['$scope', 'cartService', 'userService'];
  function pageHeaderController($scope, cartService, userService) {
    $scope.cart = cartService.cart;
    $scope.user = userService.user;
  }
})();