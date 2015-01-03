// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    scssSources: 'src/scss',
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
        projectPaths.wwwRoot + '/*.html',
        projectPaths.wwwRoot + '/js/*.js'
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
        // Jquery
        './bower_components/jquery/dist/jquery.js',
        
        // Parse SDK
        './bower_components/parse-js-sdk/lib/parse.js',
        
        // Marked (Markdown processor
        './node_modules/marked/lib/marked.js',
        
        // Dateformat (date formatting helper)
        './node_modules/dateformat/lib/dateformat.js'
    ]).pipe(gulp.dest('./www/js/lib'));
});

gulp.task('copy-app-js', function() {
    gulp.src([
        './src/js/main.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('copy-js', ['copy-vendor-js', 'copy-app-js']);

gulp.task('copy-html', function() {
   gulp.src(['./src/html/**/*.html'])
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.scssSources + '/*.scss', ['sass']);
    
    gulp.watch('src/js/*.js', ['copy-app-js']);
    
    gulp.watch('src/html/**/*.html', ['copy-html']);
});

gulp.task('default', ['sass', 'copy-js', 'copy-html', 'browser-sync', 'watch']);
