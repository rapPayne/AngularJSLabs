//To run this, you'll need mongod running.
//mongod
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

var db = mongoose.connect('mongodb://localhost/Northwind');
var product = require('./models/productModel');
var employee = require('./models/employeeModel');

var app = express();
var port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var productRouter = require('./Routes/productRoutes.js')(product);
var employeeRouter = require('./Routes/employeeRoutes.js')(employee);

app.use('/api/product',productRouter);
app.use('/api/employee',employeeRouter);
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  //console.log('Got this', req);
  res.send('Welcome to my site');
});

app.listen(port, function () {
  console.log('Node/express is running on port', port);
});