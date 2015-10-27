(function () {
  'use strict';
  angular.module('sharedModule')
    .service('customerService',customerService);
  customerService.$inject = ['$http'];
  function customerService($http) {
    this.getCustomer = function () {
      return {
        "userID": "chrisLee",
        "contactName": "Chris Lee",
        "companyName": "Waffles and Such",
        "contactTitle" : "Owner",
        "address" : "2636 Deep Valley Trail",
        "city" : "Carrollton",
        "region" : "TX",
        "postalCode" : "75007",
        "country" : "US",
        "phone" : "(972) 555-1240"
      }
    }
  }
})();