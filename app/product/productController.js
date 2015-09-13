/**
 * Created by rap on 9/13/15.
 */
(function () {
  angular.module("productModule")
    .controller("productController", productController);
  productController.$inject = ['$scope'];
  function productController($scope) {
    $scope.products = [
      {
        "productID" : 15,
        "productName" : "Genen Shouyu",
        "supplierID" : 6,
        "categoryID" : 2,
        "quantityPerUnit" : "24 - 250 ml bottles",
        "unitPrice" : 15.5,
        "unitsInStock" : 39,
        "unitsOnOrder" : 0,
        "reorderLevel" : 5,
        "discontinued" : 0
      },
      {
        "productID" : 16,
        "productName" : "Pavlova",
        "supplierID" : 7,
        "categoryID" : 3,
        "quantityPerUnit" : "32 - 500 g boxes",
        "unitPrice" : 17.45,
        "unitsInStock" : 29,
        "unitsOnOrder" : 0,
        "reorderLevel" : 10,
        "discontinued" : 0
      },
      {
        "productID" : 17,
        "productName" : "Alice Mutton",
        "supplierID" : 7,
        "categoryID" : 6,
        "quantityPerUnit" : "20 - 1 kg tins",
        "unitPrice" : 39,
        "unitsInStock" : 0,
        "unitsOnOrder" : 0,
        "reorderLevel" : 0,
        "discontinued" : 1
      },
      {
        "productID" : 18,
        "productName" : "Carnarvon Tigers",
        "supplierID" : 7,
        "categoryID" : 8,
        "quantityPerUnit" : "16 kg pkg.",
        "unitPrice" : 62.5,
        "unitsInStock" : 42,
        "unitsOnOrder" : 0,
        "reorderLevel" : 0,
        "discontinued" : 0
      },
      {
        "productID" : 19,
        "productName" : "Teatime Chocolate Biscuits",
        "supplierID" : 8,
        "categoryID" : 3,
        "quantityPerUnit" : "10 boxes x 12 pieces",
        "unitPrice" : 9.2,
        "unitsInStock" : 25,
        "unitsOnOrder" : 0,
        "reorderLevel" : 5,
        "discontinued" : 0
      },
      {
        "productID" : 20,
        "productName" : "Sir Rodney's Marmalade",
        "supplierID" : 8,
        "categoryID" : 3,
        "quantityPerUnit" : "30 gift boxes",
        "unitPrice" : 81,
        "unitsInStock" : 40,
        "unitsOnOrder" : 0,
        "reorderLevel" : 0,
        "discontinued" : 0
      }
    ];
    console.log($scope.products);
  }
})();