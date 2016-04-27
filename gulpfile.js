var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var print = require('gulp-print');

var solutionDir = process.env.NODE_SOLUTIONDIR;

gulp.task('js', function() {
  return gulp.src([`./Solutions and Starters/${solutionDir}/**/*.js`])          // #1. select all js files in the app folder
    .pipe(print((filePath) => `babel-izing ${filePath}` ))
    .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
    .pipe(gulp.dest('./dist/js'));               // #4. copy the results to the dist folder
});

gulp.task('default', function () {
  nodemon({
    ignore: ['./node_modules/*','./app/'],
    script: './northwindServer.js',
    ext: 'js',
    env: {
      port: 8000
    }
  })
    .on('restart', function () {
      console.log('Gulp has restarted node server.')
    });
});