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
var category = require('./webserver/models/categoryModel');
var employee = require('./webserver/models/employeeModel');
var user = require('./webserver/models/userModel');

var app = express();
var port = process.env.port || 3000;

// Turn on sessions
app.use(session({
  cookieName: 'session',
  secret: 'o hai there :-)',     // For encrypting the session
  duration: 20 * 60 * 1000,       // Initial life
  activeDuration: 20 * 60 * 1000,  // Extended by this much after a visit
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var productRouter = require('./webserver/Routes/productRoutes.js')(product);
var categoryRouter = require('./webserver/Routes/categoryRoutes.js')(category);
var employeeRouter = require('./webserver/Routes/employeeRoutes.js')(employee);
//var userRouter = require('./webserver/Routes/userRoutes.js')(user, customer);
var loginRouter = require('./webserver/Routes/loginRoutes.js')(user, customer);
var registerRouter = require('./webserver/Routes/registerRoutes.js')(user, customer);
var customerRouter = require('./webserver/Routes/customerRoutes.js')(customer);

app.use(favicon(__dirname + '/assets/img/favicon.ico'));
app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);
//app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/customer',customerRouter);
app.use('/api/employee',employeeRouter);
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  console.log('hit main route');
  res.redirect('/app/index.html');
});
// Authentication routes
app.get('/login', function (req, res) {
  console.log('Login route ...Session is', req.session);
  res.redirect('/app/auth/login.html');
});
app.get("/register", function (req, res) {
    console.log("hit register get");
    res.redirect("/app/auth/register.html");
  });
app.post("/register", function (req, res) {
    console.log("hit register post");
    //TODO: Add the new user here.
  });

// Product routes
app.get('/product/:id', function (req, res) {
  console.log('hit product route');
  res.redirect('/app/product/index.html#/' + req.params.id);
})
// Set up passport authentication

/*
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(function(username, password, next) {
  var user = { username: "rap", firstName: "Rap", lastName: "Payne"};
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


//TODO: Add a list of pages that should be rerouted iff the user is not logged in.

app.listen(port, function () {
  console.log('Node/express is running on port', port);
});