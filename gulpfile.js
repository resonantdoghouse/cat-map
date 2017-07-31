var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');


// File paths
var CSS_BUILD_PATH = './assets/build/styles',
    CSS_PATH = './assets/styles/**/*.scss';


gulp.task('default', function() {
    console.log('Starting gulp Styles task');

    return gulp.src(CSS_PATH)
        .pipe(autoprefixer())
        .pipe(sass({
            // outputStyle: 'compressed'
        }))
        // .pipe(sourcemaps.write())
        // .on('error', function(errorInfo){
        //     console.log(errorInfo.toString());
        //     this.emit('end');
        // })
        .pipe(gulp.dest(CSS_BUILD_PATH))
});