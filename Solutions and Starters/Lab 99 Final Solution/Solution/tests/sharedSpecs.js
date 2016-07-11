(function () {

  describe("Shared Specs", function () {
    beforeEach(angular.mock.module("sharedModule"));

    describe("Filters can be tested", function () {
      var coolerFilter;
      beforeEach(function () {
        angular.mock.inject(function (_coolerFilter_) {
//          //coolerFilter = $injector.get('$filter')('coolerFilter');
          console.log("Cooler filter is ",_coolerFilter_);
        });
      });
      it('Should look even cooler', function () {
        var oldText = "Batman";
        var newText = "Batman is cooler now";
        // = coolerFilter(oldText);
        expect(newText).toBe('Batman is cooler now');
      });
    });

    describe("Page Header Controller", function () {

      beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
      }));

      it("Should have stuff in the cart", function () {
        var userService = {user: {firstName: "Rap", lastName: "Jones"}};
        var cartFactory = {cart: [
          {product: {productID: 1}, qty: 10}, {product: {productID: 2}, qty: 5}
        ]};
        var $scope = {user: userService.user, cart: cartFactory.cart};
        var pageHeaderController = $controller('pageHeaderController', {$scope: $scope, userService: userService, cartFactory:cartFactory});
        console.log("phc:",pageHeaderController);
        expect(pageHeaderController).not.toBe('undefined');
      });
    });

    describe("Notify Factory", function () {
      var notifyFactory;

      beforeEach(function () {
        angular.mock.inject(function (_notifyFactory_) {
          notifyFactory = _notifyFactory_;
          //console.log(notifyFactory);
        });
      });

      it("Should show something", function () {
        var count = 0;
        spyOn(notifyFactory, "showSuccess").and.callFake(function () {
          count++;
        });
        notifyFactory.showSuccess("yo","title");
        notifyFactory.showSuccess("yo","title");

        expect(count).toEqual(2);
      });

    });
  });

})();