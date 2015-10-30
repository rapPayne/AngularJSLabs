var express = require('express');
var passport = require('passport');

var routes = function () {
  var apiRouter = express.Router();

  apiRouter.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });
  apiRouter.route('/')
    .get(function (req, res) {
      res.status(404).send("Well, that just don't make no sense.");
    });

  return apiRouter;
};
module.exports = routes;