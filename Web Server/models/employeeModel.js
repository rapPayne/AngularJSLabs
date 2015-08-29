var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeModel = new Schema({
  "EmployeeID" : {type: Number},
  "LastName" : {type: String},
  "FirstName" : {type: String},
  "Title" : {type: String},
  "TitleOfCourtesy" : {type: String},
  "BirthDate" : {type: Date},
  "HireDate" : {type: Date},
  "Address" : {type: String},
  "City" : {type: String},
  "Region" : {type: String},
  "PostalCode" : {type: String},
  "Country" : {type: String},
  "HomePhone" : {type: String},
  "Extension" : {type: String},
  "Photo" : {type: String},
  "Notes" : {type: String},
  "ReportsTo" : {type: Number},
  "PhotoPath" : {type: String}
});

module.exports=mongoose.model('Employee', employeeModel);