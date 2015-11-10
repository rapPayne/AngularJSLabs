(function () {
  angular.module("authModule")
    .controller("loginController", loginController);

  loginController.$inject = ['$scope', '$http','userService'];
  function loginController($scope, $http, userService) {
    $scope.login = function () {
      $http({
        method: "POST",
        url: "/api/login",
        data: {
          username: $scope.username,
          password: $scope.password
        }
      }).then(
        function (resp) {
          $scope.errorMessage = "";
          $scope.successMessage = "You're successfully logged in.";
        },
        function (err) {
          $scope.successMessage = "";
          if (err.status === 401)
            $scope.errorMessage = "Bad username and/or password. Please try again.";
          else
            $scope.errorMessage = "There was a problem logging in. Please try again.";
        }
      )
        .success(function () {
          userService.refreshUser();
        });
    };
  }
})();