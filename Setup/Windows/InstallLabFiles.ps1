# Powershell version of the install script. Based on the bash version.
# To run ...
# Start - Find PowerShell - right click- run as administrator
# set-executionpolicy remotesigned
# cd to ID/Setup/Windows
# ./installLabFiles.ps1

# Before running this, you must have installed npm (with Node.js) and
# MongoDB.

# Need a connection to the Internet
if (!(Test-Connection -computer github.com -count 1 -quiet)) {
  echo "No connection to github. Please make sure you can connect to the Internet and try again."
  exit 1
}

# Make sure npm is installed
if(!(Get-Command "npm")) {
  echo "npm wasn't found. Make sure npm is installed and in your path and try again." 
  exit 2
}

# Create the Northwind Database
./loadMongoCSVFiles.ps1
if ( $LastExitCode -ne 0 ) {
  echo "Loading of the database may not have worked. Try again."
  exit 3
}

# Run npm install for the webserver
cd ../../webserver
npm install

# Run npm install for the app
cd ../app
npm install

echo ""
echo "Installation was successful."
echo ""