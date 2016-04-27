(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('shipAddressController', shipAddressController);
  shipAddressController.$inject = ['$scope', 'customerService', 'notifyFactory'];

  function shipAddressController($scope, customerService, notifyFactory) {
    $scope.customer = customerService.getCustomer().then(success, failure);

    function success(res) {
      $scope.customer = res.data;
    }

    function failure(error) {
      console.error(error);
      notifyFactory.showWarning("If you <a href='/login'>login</a> or <a href='/register'>register</a>, we'll remember your information next time. It'll save lots of time in the future!", "You're ordering anonymously")
    }
  }


})();
