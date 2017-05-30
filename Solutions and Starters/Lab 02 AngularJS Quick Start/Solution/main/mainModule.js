(function () {
  var mod = angular.module("mainModule", []);
  mod.controller("aboutUsController", function ($scope) {
    $scope.company = {
      name: "Northwind Traders, Inc.",
      street: "2727 North Wind Trail",
      city: "Anytown",
      region: "US",
      postalCode: "99001",
      phone: "867-5309"
    }
    $scope.today = new Date();
  })
})();
