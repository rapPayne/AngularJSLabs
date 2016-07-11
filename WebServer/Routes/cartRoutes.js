var express = require('express');

var routes = function () {
  var apiRouter = express.Router();
  apiRouter.route('/')
    .get(function (req, res) {
      req.session.cart = req.session.cart || [];
      res.json(req.session.cart);
    })
    .post(function (req, res) {
      if (!req.body.product)
        res.status(400).send("Need a product");
      var product = req.body.product;
      if (!product.productID)
        res.status(400).send("Need a productID");
      var productID = parseInt(product.productID);
      if (!req.body.quantity)
        res.status(400).send("Need a quantity");
      var quantity = parseInt(req.body.quantity);
      var cart = req.session.cart || [];
      var existingLines = cart.filter(function (cartLine) {
        return cartLine.product.productID == productID;
      });
      if (existingLines.length)
        existingLines[0].quantity += quantity;
      else
        cart.push({
          "product": product,
          "quantity": quantity
        });
      req.session.cart = cart;
      //res.status(204).send("Added product to cart");
      res.json(cart);
    })
    .delete(function (req, res) {
      if (!req.body.product)
        res.status(400).send("Need a product");
      var product = req.body.product;
      if (!product.productID)
        res.status(400).send("Need a productID");
      var productID = parseInt(product.productID);
      var cart = req.session.cart || [];
      var allOtherLines = cart.filter(function (cartLine) {
        return cartLine.product.productID != productID;
      });
      req.session.cart = allOtherLines;
      res.json(allOtherLines);
    });
  return apiRouter;
};
module.exports = routes;
