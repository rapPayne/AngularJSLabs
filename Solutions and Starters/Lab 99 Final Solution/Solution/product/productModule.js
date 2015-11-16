(function () {
  angular.module("productModule", ['ngRoute', 'sharedModule']);

  angular.module("productModule")
    .config(config);
  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'productListController',
        templateUrl: "/app/product/productListPartial.html",
        caseInsensitiveMatch: true
      })
      .when('/search', {
        controller: 'productSearchController',
        templateUrl: "/app/product/productSearchPartial.html",
        caseInsensitiveMatch: true
      })
      .when('/browse/:categoryID?', {
        controller: 'productListController',
        templateUrl: "/app/product/productListPartial.html",
        caseInsensitiveMatch: true
      })
      .when('/:productID', {
        controller: 'productDetailController',
        templateUrl: "productDetailPartial.html",
        caseInsensitiveMatch: true
      })
      .otherwise({
        //redirectTo: '/app/product/index.html'
      });
    //$locationProvider.html5Mode(true);

  };
})();