#Based on loadMongoCSVFiles.bash

$dbName="northwind"

# Start up MongoDB
Start-Process mongod -RedirectStandardOutput './mongo.log' -RedirectStandardError './mongo.err'

# Make sure MongoDB is running
if (!(Get-Process mongod)) {
  echo "MongoDB server is not running. Run 'mongod' in another window and try again."
  exit 1
}

# Make sure mongoimport is in the PATH
if(!(Get-Command "mongoimport")) {
  echo "I can't find mongoimport. Get it in your PATH and try again."
  exit 1
}

# Make sure the CSV files are there
$filesLocation="../csv"
if (!(Test-Path "$filesLocation")) {
  echo "$filesLocation does not exist. Give me the directory where your csv files are located."
  exit 1
}

cd $filesLocation
$files="*.csv"
if (!(Test-Path $files )) {
  echo "No csv files found in $filesLocation. Check your directory and try again."
  exit 2
}

# Destroy the old database
@'
var conn = new Mongo();
var db = conn.getDB("$dbName");
db.dropDatabase();
'@ | mongo

# For each file in the CSV file directory, load the file into MongoDB
Get-ChildItem "." -Filter *.csv | `
Foreach-Object {
  echo "Importing file $_.FullName"
  $collection=$_.BaseName
  echo "processing $collection"
  mongoimport --db $dbName --collection $collection --type csv --headerline --file $_
}

# Change the featured product field to a true boolean.
@'
db.products.update({"featured":"true"}, {$set: {featured: true}}, {multi:true});
'@ | mongo $dbName

exit 0