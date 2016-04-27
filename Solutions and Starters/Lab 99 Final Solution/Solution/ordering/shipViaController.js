(function () {
  'use strict';
  angular.module('orderingModule')
    .controller('shipViaController', shipViaController);

  shipViaController.$inject = ['$scope'];

  function shipViaController($scope) {
    $scope.shipViaOptions = [{
        id: 1,
        name: 'Next day',
        price: 100
      },{
        id: 2,
        name: 'Two day',
        price: 50
      },{
        id: 3,
        name: 'Ground',
        price: 0
      }];
  }
})();
