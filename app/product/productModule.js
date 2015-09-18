(function () {
  angular.module("productModule", ['ngRoute']);

  angular.module("productModule")
    .config(config);
  config.$inject = ['$routeProvider'];
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'productListController',
        templateUrl: "productListPartial.html",
        caseInsensitiveMatch: true
      })
      .when('/:productID', {
        controller: 'productDetailController',
        templateUrl: "productDetailPartial.html",
        caseInsensitiveMatch: true
      })
      .otherwise({
        //redirectTo: '/app/product/index.html'
      })
  };
})();
