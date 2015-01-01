// Import required dependencies.
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncReload = browserSync.reload,
    sass = require('gulp-sass'),
    filter = require('gulp-filter');

var browserSyncConfig = {
    server: {
        baseDir: "./"
    },
    files: [
        "css/*.css",
        "*.html"
    ]
};

gulp.task('sass', function() {
   return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch('scss/*.scss', ['sass']);
});

