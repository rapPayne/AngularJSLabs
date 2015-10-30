(function () {
  angular.module("authModule")
    .controller("registerController",registerController);
  registerController.$inject = ['$scope', '$http'];
  function registerController($scope, $http) {
    $scope.registerUser = function () {
      $http({
        method: "POST",
        url: "/api/register",
        data: {
          username: $scope.username,
          password: $scope.password,
          email: $scope.email,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          companyName: $scope.companyName,
          address: $scope.address,
          city: $scope.city,
          region: $scope.region,
          postalCode: $scope.postalCode,
          country: $scope.country
        }
      }).then(
        function (resp) {
          $scope.errorMessage = "";
          $scope.successMessage = "Your account has been created. Let's get shopping!";
        },
        function (err) {
          $scope.successMessage = "";
          $scope.errorMessage = err.data;
        }
      )
    };
  }
})();
