(function () {
  angular.module("authModule")
    .controller("registerController",registerController);
  registerController.$inject = ['$scope', '$http', 'notifyFactory'];
  function registerController($scope, $http, notifyFactory) {
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
          notifyFactory.showSuccess("Your account has been created. Let's get shopping!","You're registered");
        },
        function (err) {
          $scope.successMessage = "";
          $scope.errorMessage = err.data;
          notifyFactory.showError("Please try again. " + err.data, "Registration failed");
        }
      )
    };
  }
})();
