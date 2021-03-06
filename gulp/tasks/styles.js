var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	mixins = require('postcss-mixins'),
	hexrgba = require('postcss-hexrgba');

// Take the styles.css file, pipe it through a number of PostCSS functions, bring it to its new destination.
gulp.task('styles', function() {
	return (
		gulp
			.src('./app/assets/styles/styles.css')
			.pipe(
				postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer])
			)
			// If an error happens
			// The watch task will not see an error, it will see that the styles task has ended like it normally would
			.on('error', function(errorInfo) {
				console.log(errorInfo.toString());
				this.emit('end');
			})
			.pipe(gulp.dest('./app/temp/styles'))
	);
});
