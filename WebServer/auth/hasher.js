(function (hasher) {
  var crypto = require("crypto");

  hasher.createRandomSalt = function () {
    var length = 8;
    var salt = crypto.randomBytes(Math.ceil(length/2)).toString("hex").substr(0,length);
    return salt;
  };
  hasher.hashPassword = function (clearTextPassword, salt) {
    var hmac = crypto.createHmac("sha1", salt);
    var hash = hmac.update(clearTextPassword);
    var hashedPassword = hash.digest("hex");
    return hashedPassword;
  };
  hasher.getRandomCustomerID = function (){
      var custID = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
        custID += possible.charAt(Math.floor(Math.random() * possible.length));
      return custID;
  }
})(module.exports);