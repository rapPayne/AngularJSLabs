(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('shipAddressController',shipAddressController);
  shipAddressController.$inject = ['$scope','customerService'];
  function shipAddressController($scope, customerService) {
    console.log('in shipAddressController');
    $scope.customer = customerService.getCustomer();
  }
})();