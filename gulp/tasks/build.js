var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: 'docs'
		}
	});
});

// first delete the dist folder to begin each build with a new slate
// (for example if any files are deleted, this should be reflected in the dist folder so that this folder does not runs behind)
gulp.task('deleteDistFolder', function() {
	return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	// Include an array with the paths you want to use in gulp.src (instead of typing out each path in the gulp.src itself)

	// With ! you can tell which paths to exclude.
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	];

	return gulp.src(pathsToCopy).pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp
		.src(['./app/assets/images/**/*'])
		.pipe(
			imagemin({
				progressive: true,
				interlaced: true,
				multipass: true
			})
		)
		.pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start('usemin');
});

// gulp.task('usemin', ['styles', 'scripts'], function() {
// 	return gulp
// 		.src('./app/index.html')
// 		.pipe(
// 			usemin({
// 				css: [rev, cssnano],
// 				js: [rev, uglify]
// 				// Tell usemin what to do with the css and js files, in the array provide the functions or filters that you want to perform.
//
// 				// In the css property, in the array the first item is for revisioning the file, the second for compression.
// 				// Include return so that gulp is aware when the function completes.
// 			})
// 		)
// 		.pipe(gulp.dest('./docs'));
// });

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp
		.src('./app/index.html')
		.pipe(
			usemin({
				css: [
					function() {
						return rev();
					},
					function() {
						return cssnano();
					}
				],
				js: [
					function() {
						return rev();
					},
					function() {
						return uglify();
					}
				]
			})
		)
		.pipe(gulp.dest('./docs'));
});

gulp.task('build', [
	'deleteDistFolder',
	'copyGeneralFiles',
	'optimizeImages',
	'useminTrigger'
]);

// css: [
//   function() {
//     return rev();
//   },
//   function() {
//     return cssnano;
//   }
// ],
// js: [
//   function() {
//     return rev();
//   },
//   function() {
//     return uglify();
//   }
// ]
