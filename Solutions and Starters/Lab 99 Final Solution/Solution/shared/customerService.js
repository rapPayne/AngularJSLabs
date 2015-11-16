(function () {
  'use strict'
  angular.module("sharedModule")
    .service("customerService",customerService);
  customerService.$inject = ['$http'];

  function customerService($http) {
    this.getCustomer = function (customerID) {
      return $http({
          url: "/api/customer/" + customerID,
          method: "GET"
        });
    };
  }

})();