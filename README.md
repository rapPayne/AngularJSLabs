# AngularJSLabs
The labs to accompany the 3 - 5 day AngularJS classes

## To install
1. Make sure MongoDB and NodeJS/npm are installed.
3. cd to the setup directory for your OS (Unix or Windows)
`cd setup/Windows
or
`cd setup/Unix
4. Run the installLab script
`installLab.ps1  # On Windows
or
`installLab.bash  # On Mac/Linux
 
## To run the site
1. Start Mongo daemon
`mongod
2. Start the web server
`node northwindServer.js
3. Point your browser to the address that it tells you to, usually localhost:8000.
`http://localhost:8000

## To run a solution or starter
You can run a particular version of the site under Solutions and Starters by setting the NODE_SOLUTIONDIR 
environment variable before you start the web server.
### On Windows
`set NODE_SOLUTIONDIR="Lab 99 Final Solution/Solution"
`node northwindServer.js
### On Mac/Linux
`export NODE_SOLUTIONDIR="Lab 99 Final Solution/Solution"
`node northwindServer.js
This will cause Node/Express to return the files under that directory instead of the ones under /app.

## To edit your own copy

If you have gulp, just type gulp.  It'll start the server and report the port.  If not, 