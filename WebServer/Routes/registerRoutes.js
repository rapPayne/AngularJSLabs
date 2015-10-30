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
      //Other checks here??
      u.salt = salt;
      u.passwordHash = passwordHash;
      u.save().then(
        function () {
          c.contactName = contactName;
          c.contactTitle = "Buyer";
          c.customerID = customerID;
          c.save().then(
            function (data) {
              console.log(data);
            },
            function (error) {
              console.log("Error creating the customer record.", error);
              res.status(500).send("Error creating customer.");
            }
          );
        },
        function (error) {
          console.log("Error creating the user.", error);
          res.status(500).send("Error creating the user");
        });
      res.status(201).send(u);
    });

  return apiRouter;

};
module.exports = routes;

