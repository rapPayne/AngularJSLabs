var express = require('express');

var routes = function () {
  var apiRouter = express.Router();
  apiRouter.route('/')
    .get(function (req, res) {
      res.json(req.session.cart);
    })
    .post(function (req, res) {
      if (! req.body.product )
        res.status(400).send("Need a product");
      var product = req.body.product;
      if (! product.productID )
        res.status(400).send("Need a productID");
      var productID = parseInt(product.productID);
      if (! req.body.quantity )
        res.status(400).send("Need a quantity");
      var quantity = parseInt(req.body.quantity);
      var cart = req.session.cart || [];
      console.log("cart is ", cart);
      var existingLines = cart.filter(function (cartLine) {
        console.log("result", cartLine.productID == productID, "cartline", cartLine, productID);
        return cartLine.product.productID == productID;
      });
      console.log("Existing lines", existingLines, "Cart", cart);
      if (existingLines.length)
        existingLines[0].quantity += quantity;
      else
        cart.push({"product": product, "quantity": quantity});
      req.session.cart = cart;
      res.status(204).send("Added product to cart");
    })
    .delete(function (req, res) {
      res.status(500).send("Delete not yet implemented. It's not you. It's me.");
    });
return apiRouter;
};
module.exports = routes;

