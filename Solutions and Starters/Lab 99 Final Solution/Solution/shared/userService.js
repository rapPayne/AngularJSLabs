(function () {
  'use strict';
  angular.module('sharedModule')
    .service('userService', userService);
  userService.$inject = ['$http'];

  function userService($http) {
    var self = this;
    self.user = {};

    self.refreshUser = function () {
      $http.get('/api/user')
        .then(
          function (res) {
            for (var prop in res.data) {
              self.user[prop] = res.data[prop];
            }
          },
          function (error) {
            console.error('Problem getting the logged-in user', error);
          }
        );
    };
    self.refreshUser();
  }
})();