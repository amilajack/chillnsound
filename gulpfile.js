const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('sass', () => gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
  .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
  .pipe(gulp.dest('app/css')) // Outputs it in the css folder
  .pipe(browserSync.reload({ // Reloading with Browser Sync
    stream: true
  })));

// Watchers
gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', () => gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist')));

// Optimizing Images
gulp.task('images', () => gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images')));

// Copying fonts
gulp.task('fonts', () => gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts')));

// Copying sounds
gulp.task('sounds', () => gulp.src('app/sounds/**/*')
  .pipe(gulp.dest('dist/sounds')));

// Cleaning
gulp.task('clean', () => del.sync('dist').then(cb => cache.clearAll(cb)));

gulp.task('clean:dist', () => del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*', '!dist/sounds', '!dist/sounds/**/*']));

// Build Sequences
// ---------------

gulp.task('default', (callback) => {
  runSequence(
    ['sass', 'browserSync'], 'watch',
    callback
  );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts', 'sounds'],
    callback
  );
});
