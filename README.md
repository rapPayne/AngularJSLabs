# AngularJSLabs
The labs to accompany the 3 - 5 day AngularJS classes

## To install
1. Make sure MongoDB and NodeJS/npm are installed and running.
1. cd to the setup directory for your preferred shell (bash/ksh or Powershell)

  ```bash
  cd setup/bash # In bash
  ```
  or
  ```powershell
  cd setup/powershell   # In Powershell
  ```

1. Run the installLab script
  ```
  installLab.bash  # In bash
  ```
or
  ```
  installLab.ps1  # In Powershell
  ```

 
## To run the site
1. Start Mongo daemon in a command window
  ```
  mongod
  ```
1. Start the web server in another window
  ```
  node northwindServer
  ```
1. Point your browser to the address that it tells you to, usually localhost:3000.
  ```
  http://localhost:3000
  ```

## To run a solution or starter
You can run a particular version of the site under Solutions and Starters by setting the NODE_SOLUTIONDIR 
environment variable before you start the web server.
### In bash/ksh
```
export NODE_SOLUTIONDIR="Lab 99 Final Solution/Solution"
node northwindServer.js
```
### In Powershell
```
set NODE_SOLUTIONDIR="Lab 99 Final Solution/Solution"
node northwindServer.js
```

This will cause Node/Express to serve the files under that directory instead of the ones under /app.

## To edit your own copy

If you have [gulp](http://gulpjs.com/), just type `gulp`.  Gulp will start the server and report the port.  If not, you can restart the server each time you edit server-side code.

## What if my company won't allow me to install mongo?
1. Go get the package from [mongo](https://www.mongodb.com/download-center) anyway. 
1. Install it on any **other** machine. 
1. Find the executables (mongod.exe, mongo.exe, mongoimport.exe, etc.)
1. Copy them to a directory you do have access to on your secured machine.
1. Edit the $PATH (or %PATH%) to include this folder. You may need to reboot.
1. Test it out by going mongod --version


