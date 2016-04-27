(function () {
  angular.module("authModule")
    .controller("loginController", loginController);

  loginController.$inject = ['$scope', '$http','userService','notifyFactory'];
  function loginController($scope, $http, userService, notifyFactory) {
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
          $scope.successMessage = "You're successfully logged in as" + $scope.username;
          notifyFactory.showSuccess("You're successfully logged in as " + $scope.username,"Welcome!")
        },
        function (err) {
          $scope.successMessage = "";
          if (err.status === 401) {
            $scope.errorMessage = "Bad username and/or password. Please try again.";
            notifyFactory.showWarning("Bad username and/or password. Please try again.", "Oh, no.");
          } else {
            $scope.errorMessage = "There was a problem logging in. Please try again.";
            notifyFactory.showError("There was a problem logging in. Please try again.", "Oh, no.");
          }
        }
      )
        .then(function () {
          userService.refreshUser();
        });
    };
  }
})();