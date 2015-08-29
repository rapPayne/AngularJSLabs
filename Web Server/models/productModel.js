var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productModel = new Schema({
  "ProductID" : {type: Number},
  "ProductName" : {type: String},
  "SupplierID" : {type: Number},
  "CategoryID" : {type: Number},
  "QuantityPerUnit" : {type: String},
  "UnitPrice" : {type: Number},
  "UnitsInStock" : {type: Number},
  "UnitsOnOrder" : {type: Number},
  "ReorderLevel" : {type: Number},
  "Discontinued" : {type: Boolean, default: false }
});

module.exports=mongoose.model('Product', productModel);