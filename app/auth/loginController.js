(function () {
  angular.module("authModule")
    .controller("loginController", loginController);

  loginController.$inject = ['$scope', '$http'];
  function loginController($scope, $http) {
    console.log('loginController');

    $scope.instructionsMessage = "Please enter your username and password or <a href='register.html'>Register</a> if you don't have an account.";

    $scope.login = function () {
      console.log("Login scope:", $scope);
      $scope.instructionsMessage = null;
      $http({
        method: "POST",
        url: "/api/login",
        data: {
          username: $scope.username,
          password: $scope.password
        }
      }).then(
        function (resp) {
          console.info("logged in", resp);
          $scope.errorMessage = "";
          $scope.successMessage = "You're successfully logged in.";
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