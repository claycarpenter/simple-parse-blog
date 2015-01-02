// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    scssSources: 'scss',
    wwwRoot: 'www'
};

// Import required dependencies.
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncReload = browserSync.reload,
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat');

var browserSyncConfig = {
    server: {
        baseDir: './' + projectPaths.wwwRoot
    },
    files: [
        projectPaths.wwwRoot + '/css/*.css',
        projectPaths.wwwRoot + '/*.html'
    ]
};

gulp.task('sass', function() {
   return gulp.src(projectPaths.scssSources + '/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(projectPaths.wwwRoot + '/css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

gulp.task('copy-vendor-js', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/parse-js-sdk/lib/parse.js'
    ]).pipe(gulp.dest('./www/js'));
});

gulp.task('copy-app-js', function() {
    gulp.src([
        './js/main.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('copy-js', ['copy-vendor-js', 'copy-app-js']);

gulp.task('watch', function() {
    gulp.watch(projectPaths.scssSources + '/*.scss', ['sass']);
    
    gulp.watch('js/*.js', ['copy-app-js']);
});

gulp.task('default', ['sass', 'copy-js', 'browser-sync', 'watch']);
