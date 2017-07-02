var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
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
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .on('error', err => {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename('templater.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function () {
    watch('./src/templater.js', () => {
      gulp.start('build');
    });
})