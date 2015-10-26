var express = require('express');
var hasher = require('../auth/hasher');

var routes = function (user, customer) {
  var apiRouter = express.Router();

  apiRouter.route('/')
    //Adding a new user
    .post(function (req, res) {
      var u = new user(req.body);
      var c = new customer(req.body);
      console.log("Post register route", u, c);
      var salt = hasher.createRandomSalt();
      var passwordHash = hasher.hashPassword(req.body.password, salt);
      var customerID = hasher.getRandomCustomerID();
      var contactName = u.firstName + " " + u.lastName;
      //TODO: Make sure this insert is valid:
      //Username is not already taken
      u.salt = salt;
      u.passwordHash = passwordHash;
      u.save().then(function () {
        c.contactName = contactName;
        c.contactTitle = "Buyer";
        c.customerID = customerID;
        c.save();
      });
      res.status(201).send(u);
    });

  return apiRouter;

};
module.exports = routes;

