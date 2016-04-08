
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    watchify = require("watchify"),
    streamify = require("gulp-streamify"),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnext = require("gulp-cssnext"),
    uglify = require('gulp-uglify');

// src path
var path = {
  sass: ['src/css/*.scss'],
  js: "./src/js",
};

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('sass', function () {
  gulp.src(path.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css/'));
      gulp.src("dist/css/new-styles.css") // css dist path
      .pipe(autoprefixer({
          browsers: ["> 1%", 'IE 8'],
          cascade: false,
      }))
      .pipe(cssnext({
          compress:true,
          browsers: ["> 1%", 'IE 8'],
      }))
      .pipe(gulp.dest("dist/css/"))
      .pipe(notify("CSS compiled"));
});

gulp.task('sass-watch', function () {
  gulp.watch(path.sass, ['sass']);
});


/**
 * turn es2015,jsx files into single file
 * @param  {[type]} file  [description]
 * @param  {[type]} watch [description]
 * @return {[type]}       [description]
 */
function buildScript(file, watch) {
  var entry = {entries:[path.js + "/" + file]};
  var bundler = browserify({
    entries: path.js + "/" + file,
    extensions: [".jsx"],
    debug: watch //allow sourcemap for debugging in dev
  });
  if (watch) {
    bundler = watchify(bundler);
  }
  bundler.transform("babelify", {presets:["es2015","react"]});

  var rebundle = function() {
    var stream = bundler.bundle();
    stream.on("error", handleErrors);
    stream = stream.pipe(source("app.js")); // final name
    if (!watch) {
      // if production 
      stream
        .pipe(streamify(uglify()))
    }
    return stream
      .pipe(gulp.dest("dist/js")) // final path
      .pipe(notify(file + ": finished"));
  };

  bundler.on("update", rebundle);
  return rebundle();

}


/**
 * Use for production build
 */
gulp.task('build', function () {
   buildScript("app.jsx", false);
});
/**
 * for dev
 */
gulp.task("watchScript", function(){
  buildScript("app.jsx", true);
});


gulp.task('default', ['watchScript',"sass-watch"]);
