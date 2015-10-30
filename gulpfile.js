var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

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