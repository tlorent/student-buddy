var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();

/*
  You use the task method of gulp to create a new task.
  The first argument is the name you give to the task,
  the second argument is what will happen when this task runs.
  */

// pass two arguments in the watch function: first is the file you want to watch for saved changes
// second argument to indicate what the function should do
gulp.task('watch', function() {
	// Initialize the browsersync init method
	// and indicate where the base directory of the server should get the html
	browserSync.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});

	// When a change is made to the index.html file, reload the browserSync function
	watch('./app/index.html', function() {
		browserSync.reload();
	});

	/* with **, watch for any future hypothetical folders in the styles
  folder, with any .css extensions */
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject'); // Indicate which Gulp task should be started
	});

	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});
});

// ['styles'] is a dependency for cssInject, i.e. cssInject will only run after styles has completed. This gives it a chance to add the compiled CSS file into browser-sync.
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream()); // make whatever you're piping into browserSync available in the browser
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});
