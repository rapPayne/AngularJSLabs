//To run this, you'll need mongod running.
//mongod
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
//var fs = require('fs');

var db = mongoose.connect('mongodb://localhost/northwind');
var customer = require('./webserver/models/customerModel');
var product = require('./webserver/models/productModel');
var category = require('./webserver/models/categoryModel');
var employee = require('./webserver/models/employeeModel');
var user = require('./webserver/models/userModel');
// Note: cart is not a database collection. It is only stored in session.
var auth = require('./webserver/auth/auth.js');

var app = express();
var port = process.env.port || 3000;

// Turn on sessions
app.use(session({
  cookieName: 'session',
  secret: 'o hai there :-)',       // For encrypting the session
  duration: 20 * 60 * 1000,        // Initial life
  activeDuration: 20 * 60 * 1000,  // Extended by this much after a visit
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport Authentication
auth.initPassport(passport, user);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var cartRouter = require('./webserver/Routes/cartRoutes.js')();
var productRouter = require('./webserver/Routes/productRoutes.js')(product);
var categoryRouter = require('./webserver/Routes/categoryRoutes.js')(category);
var employeeRouter = require('./webserver/Routes/employeeRoutes.js')(employee);
var userRouter = require('./webserver/Routes/userRoutes.js')(user, customer);
var loginRouter = require('./webserver/Routes/loginRoutes.js')();
var registerRouter = require('./webserver/Routes/registerRoutes.js')(user, customer);
var customerRouter = require('./webserver/Routes/customerRoutes.js')(customer);

app.use(favicon(__dirname + '/assets/img/favicon.ico'));
app.use('/api/cart',cartRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/customer',customerRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);
app.use('/api/user',userRouter);

//Routes to allow pointing to starters based on an env variable
var solutionDir = process.env.NODE_SOLUTIONDIR;
if (solutionDir) {
  app.get('/app/:p1', function (req, res) {
    var file = path.join(__dirname, 'Solutions and Starters', solutionDir, req.params.p1);
    res.sendFile(file);
  });
  app.get('/app/:p1/:p2', function (req, res) {
    var file = path.join(__dirname, 'Solutions and Starters', solutionDir, req.params.p1, req.params.p2);
    res.sendFile(file);
  });
  app.get('/app/:p1/:p2/:p3', function (req, res) {
    var file = path.join(__dirname, 'Solutions and Starters', solutionDir, req.params.p1, req.params.p2, req.params.p3);
    res.sendFile(file);
  });
}
app.use(express.static(__dirname));

//TODO: Add a list of pages that should be rerouted iff the user is not logged in.
// Root route
app.get('/', function (req, res) {
  res.redirect('/app/index.html');
});
// Authentication routes
app.get('/login', function (req, res) {
  res.redirect('/app/auth/login.html');
});
app.get("/register", function (req, res) {
  res.redirect("/app/auth/register.html");
});
// Product routes
app.get('/product/:id', function (req, res) {
  res.redirect('/app/product/index.html#/' + req.params.id);
});
app.get('/search', function (req, res) {
  res.redirect('/app/product/index.html#/search?searchString=' + req.query.searchString);
});
app.get('/browse', function (req, res) {
  res.redirect('/app/product/index.html#/browse');
});
// Ordering routes
app.get('/checkout', function (req, res) {
  res.redirect('/app/ordering/checkout.html');
});

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

// Middleware to redirect to Login if the user is not logged in.
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}