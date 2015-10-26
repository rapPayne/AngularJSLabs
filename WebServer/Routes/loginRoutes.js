var express = require('express');
var hasher = require('../auth/hasher');

var routes = function (user, customer) {
  var apiRouter = express.Router();

  //Provide a list of all users
  //TODO: Combine with next sections.  Shoule only get one user at a time, the login user.

  // Middleware insertion - intercept the request and do the find based on username and password.
  apiRouter.use('/', function (req, res, next) {
    //TODO: Read his/her record based on username and password.  Currently only username.
    // and getting it from a route parameter.  Should be from the POST params
    user.find({ "username": req.body.username, "password": req.body.password }, function(err, user){
      if (err)
        res.status(500).send(err);
      else if (user) {
        req.user = user;
        console.log("logging on", user, req.session);
        req.session.user = req.user;  // Store the user in session for subsequent requests.  Will time out in 20 minutes.
        next();
      } else {
        res.status(404).send('No user with that name.');
      }
    });
  });

  apiRouter.route('/')
    .post(function (req, res) {
      //TODO: Make sure user is authorized to read his own data
      var password = req.body.password;
      var username = req.body.username;
      console.log("in loginRoute username='" + username + "' password='" + password +"'");
      res.json(req.user);
    });
  return apiRouter;

};
module.exports = routes;

