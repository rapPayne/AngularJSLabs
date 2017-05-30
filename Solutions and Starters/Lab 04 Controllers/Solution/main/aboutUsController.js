(function () {
  angular.module("mainModule")
    .controller("aboutUsController", aboutUsController);
  aboutUsController.$inject=['$scope'];
  function aboutUsController($scope) {
    $scope.company = {
      name: "Northwind Traders, Inc.",
      street: "1008 W Ave D",
      city: "Garland",
      region: "TX",
      postalCode: "75040",
      phone: "867-5309"
    }
    $scope.today = new Date();
  }
})();