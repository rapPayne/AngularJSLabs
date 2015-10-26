#!/bin/bash

# Before running this, you must have installed npm (with Node.js) and
# MongoDB.

# Need a connection to the Internet
if ! (ping -c1 github.com >/dev/null)  ; then
  echo "No connection to github. Please make sure you can connect to the Internet and try again." >&2
  exit 1
fi

# Make sure npm is installed
if ! (npm --version >/dev/null 2>&1) ; then
  echo "npm wasn't found. Make sure npm is installed and in your path and try again." >&2
  exit 2
fi

# Create the Northwind Database
./loadMongoCSVFiles.bash
if (( $? != 0 )) ; then
  exit 3
fi

# Run npm install for the webserver
cd ../../webserver
npm install

# Run npm install for the app
cd ../app
npm install

echo ""
echo "Installation was successful."
echo ""
