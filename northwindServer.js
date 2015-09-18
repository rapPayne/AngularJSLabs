//To run this, you'll need mongod running.
//mongod
var x;
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var auth = require('./webserver/auth'); // Whole darn directory
//var fs = require('fs');

var db = mongoose.connect('mongodb://localhost/northwind');
var customer = require('./webserver/models/customerModel');
var product = require('./webserver/models/productModel');
var employee = require('./webserver/models/employeeModel');
var user = require('./webserver/models/userModel');


var app = express();
var port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var productRouter = require('./webserver/Routes/productRoutes.js')(product);
var employeeRouter = require('./webserver/Routes/employeeRoutes.js')(employee);
var userRouter = require('./webserver/Routes/userRoutes.js')(user, customer);
var customerRouter = require('./webserver/Routes/customerRoutes.js')(customer);

app.use(favicon(__dirname + '/assets/img/favicon.ico'));
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/customer',customerRouter);
app.use('/api/employee',employeeRouter);
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  console.log('hit main route');
  res.redirect('/app/index.html');
});

app.get('/product/:id', function (req, res) {
  console.log('hit product route');
  res.redirect('/app/product/index.html#/' + req.params.id);
})
// Set up passport authentication
/*
app.use(session({secret: 'o hai there :-)'}));  //express sessions before passport sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(function(username, password, next) {
  var user = { username: "rap", firstName: "Bob", lastName: "Payne"};
  return next(null, user);
}));
  //TODO: Do a real verify from here: auth.verifyUser));
passport.serializeUser(function(user, next) {
  next(null, user.username);
});
passport.deserializeUser(function(username, next) {
  //TODO: actually look up the user here
  var user = {
    username: "rap",
    email: "rap@creator.net",
    firstName: "Rap",
    lastName: "Payne",
    salt: "some salt stored in DB in clear text",
    hashedPassword: "fake Hashed password"
  };
  next(null, user);
});

app.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    res.json(req.user);
  });
*/

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

app.listen(port, function () {
  console.log('Node/express is running on port', port);
});