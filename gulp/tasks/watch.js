var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

// pass two arguments in the watch function: first is the file you want to watch for saved changes
// second argument to indicate what the function should do
gulp.task('watch', function() {

  // tell BS where the site lives in baseDir
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  // When a change is made to the index.html file, reload the browserSync function
  watch('./app/index.html', function(){
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function(){
    gulp.start('cssInject');
  });

});

// ['styles'] is a dependency for cssInject, i.e. cssInject will only run after styles has completed. This gives it a chance to add the compiled css file into browser-sync.
gulp.task('cssInject', ['styles'] ,function(){
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
