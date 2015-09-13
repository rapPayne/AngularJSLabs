var express = require('express');

var routes = function (product) {
  var apiRouter = express.Router();
  apiRouter.route('/')
    .get(function (req, res) {
      var search = req.query.search;
      var regex = new RegExp(search, "i");
      product.find({"productName" : regex}, function(err, products){
        if (err)
          res.status(500).send(err);
        else
          res.json(products);
      });
    })
    .post(function (req, res) {
      var p = new product(req.body);
      p.save();
      res.status(201).send(p);
    });

  apiRouter.use('/:productId', function (req, res, next) {
    product.findById(req.params.productId, function (err, product) {
      if (err) {
        res.status(500).send(err);
      } else if (product) {
        req.product = product;
        next();
      } else {
        res.status(404).send("No product with that Id");
      }
    });
  });
  apiRouter.route('/:productId')
    .get(function (req, res) {
      res.json(req.product);
    })
    .put(function (req, res) {
      for (var key in req.product) {
        if (key in req.body)
          req.product[key] = req.body[key];
      }
      req.product.save(function (err) {
        if (err)
          res.status(500).send(err);
        else
          res.status(204).send("Product replaced");
      });
    })
    .patch(function (req, res) {
      if (req.body._id)
        delete req.body._id;
      for (var key in req.body) {
        if (key in req.product)
          req.product[key] = req.body[key];
      }
      req.product.save(function (err) {
        if (err)
          res.status(500).send(err);
        else
          res.status(204).send("product updated");
      });
    })
    .delete(function (req, res) {
      req.product.remove(function (err) {
        if (err)
          res.status(500).send(err);
        else
          res.status(204).send();
      });
    });
  return apiRouter;

};
module.exports = routes;

