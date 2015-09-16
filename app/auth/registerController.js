(function () {
  angular.module("authModule")
    .controller("registerController",registerController);
  registerController.$inject = ['$scope', '$http'];
  function registerController($scope, $http) {
    $scope.registerUser = function () {
      console.log("You submitted");
      $http({
        method: "POST",
        url: "/api/user",
        data: {
          username: $scope.username,
          password: $scope.password,
          email: $scope.email,
          companyName: $scope.companyName,
          address: $scope.address,
          city: $scope.city,
          region: $scope.region,
          postalCode: $scope.postalCode,
          country: $scope.country
        }
      }).then(
        function (resp) {
          console.log(resp);
          $scope.errorMessage = "";
          $scope.successMessage = "Your account has been created. Let's get shopping!";
        },
        function (err) {
          console.error(err);
          $scope.successMessage = "";
          $scope.errorMessage = err.data;
        }
      )
    };
  }
})();
