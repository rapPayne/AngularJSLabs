(function () {
  'use strict';
  angular.module('sharedModule')
    .controller('pageHeaderController', pageHeaderController);

  pageHeaderController.$inject = ['$scope', 'cartFactory', 'userService'];

  function pageHeaderController($scope, cartFactory, userService) {
    $scope.cart = cartFactory.cart;
    $scope.user = userService.user;
  }
})();
