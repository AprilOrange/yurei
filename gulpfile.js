var
  gulp = require('gulp'),
  minifyHTML = require('gulp-minify-html'),
  sourcemaps   = require('gulp-sourcemaps'),
  cssnext = require('gulp-cssnext'),
  postcss = require('gulp-postcss'),
  uglify = require('gulp-uglify'),
  serve = require('gulp-serve'),
  concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src(['./src/js/handlebars.js', './src/js/q.js', './src/js/qwest.js', './src/js/trimHTML.js', './src/js/marked.js', './src/js/config.js', './src/js/app.js'])
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true
  }
  gulp.src('./src/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'))
});

gulp.task('css', function() {
  gulp.src(['./src/css/markdown.css', './src/css/style.css'])
    .pipe(concat('main.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss([require('postcss-nested'), require('cssgrace')])) 
    .pipe(cssnext({
        compress: true
    }))   
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
});


gulp.task('serve', serve({
  root: './',
  port: '2333'
}));

gulp.task('watch', function() {
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/html/*.html', ['html']);
});

gulp.task('build', ['js', 'html', 'css']);

gulp.task('default', ['build', 'serve', 'watch']);
