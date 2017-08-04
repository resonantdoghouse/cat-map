/**
 * Gulp Requirements
 * @type {*|Gulp}
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps');


/**
 * File paths
 * @type {string}
 */
var SCRIPTS_PATH = './public/assets/js',
    SCRIPTS_BUILD_PATH = './public/assets/build/js',
    CSS_PATH = './public/assets/styles/**/*.scss',
    CSS_BUILD_PATH = './public/assets/build/styles';


/**
 * Sass Task
 * Compile & minify scss css
 */
gulp.task('sass', function () {

    console.log('starting style');

    return gulp.src(['./public/assets/styles/sanitize.css', CSS_PATH])
        .pipe(plumber(function (err) {
            console.log('Styles task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CSS_BUILD_PATH))
        .pipe(livereload());

});


/**
 * Scripts Task
 */
gulp.task('scripts', function () {

    console.log('Starting gulp Scripts task 🤖');

    return gulp.src([
        SCRIPTS_PATH + '/lib/jquery.min.js',
        SCRIPTS_PATH + '/lib/knockout-3.4.2.js',
        SCRIPTS_PATH + '/map.js',
        SCRIPTS_PATH + '/main.js',
        SCRIPTS_PATH + '/sidebar.js'
    ])
        .pipe(plumber(function (err) {
            console.log('Scripts task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SCRIPTS_BUILD_PATH))
        .pipe(livereload());

});


/**
 * Default Task
 */
gulp.task('default', function () {
    console.log('Default Gulp task run 🥛');
});


/**
 * Watch Task
 */
gulp.task('watch', function () {
    console.log('Gulp Watch task running... 👀');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH + '/*.js', ['scripts']);
    gulp.watch(CSS_PATH,  ['sass']);
});