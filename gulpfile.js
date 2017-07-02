var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    amountOfStages = 10;

for (var i = 1; i < amountOfStages; i++) {
    (function () {
        var j = i;
        gulp.task('test-stage-' + j, function () {
            return gulp
                .src('spec/stage-' + j + '/index.html')
                .pipe(mochaPhantomJS());
        });
    })();
}

gulp.task('build', function () {
    return gulp.src('./src/templater.js')
        .pipe(rename('templater.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('error', err => {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./dist/'));
});