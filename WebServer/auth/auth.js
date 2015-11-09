var hasher = require("./hasher");
var localStrategy = require('passport-local').Strategy;

var auth = {
  // Set up passport authentication
  initPassport: function (passport, repo) {
    passport.use(new localStrategy(function (username, password, next) {
      //Case-insensitive NoSQL query
      repo.findOne({username: {"$regex": "^"+username+"$", "$options": "-i"}}, function (err, user) {
        if (!err && user) {
          var hashedPassword = hasher.hashPassword(password, user.salt);
          if (hashedPassword === user.passwordHash) {
            next(null, user);
            return;
          }
        }
        next(err, null, "Bad username or password");
      });
    }));
    passport.serializeUser(function (user, next) {
      next(null, user.username);
    });
    passport.deserializeUser(function (username, next) {
      repo.findOne({username: username}, function (err, user) {
        if (!err && user) {
          next(null, user);
          return;
        }
        next(null, false, "Failed to retrieve user");
      });
    });
  }
};

module.exports = auth;