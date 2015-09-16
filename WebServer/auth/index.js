(function (auth) {
  var hasher = require("./hasher");

  auth.verifyUser = function (username, password, next) {
    //TODO: Get the real user
    var user = {
      username: "rap",
      email: "rap@creator.net",
      firstName: "Rap",
      lastName: "Payne",
      salt: "some salt stored in DB in clear text",
      hashedPassword: "fake Hashed password"
    };
    if (!err && user) {
      var testHash = hasher.hashPassword(password,user.salt);
      if (testHash !== user.hashedPassword)
        next(null, false, { message: "Bad password. Please try again"});
      else
        next(null, user);
    }
    next(null, false, { message: "Bad password. Please try again"});
    return;
  };
  console.log("auth is ", global.auth);
})(module.exports);