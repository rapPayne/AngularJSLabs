(function () {
  angular.module("mainModule")
    .controller("mainProductController", mainProductController);

  mainProductController.$inject = ['$scope', 'productService'];

  function mainProductController($scope, productService) {
    productService.getFeaturedProducts()
      .then(function (res) {
        $scope.products = res.data;
      }, function (error) {
        console.error("Error getting the list of products: " + error.data, error);
      });
  }
})();
