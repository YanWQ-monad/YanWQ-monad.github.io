const gulp = require('gulp');
const gulp_babel = require('gulp-babel');
const gulp_concat = require('gulp-concat');
const gulp_rename = require('gulp-rename');
const gulp_uglify = require('gulp-uglify');
const gulp_clean_css = require('gulp-clean-css');

gulp.task('js', function() {
    return gulp.src([
            './source/_js/3rd_party/*.js',
            './source/_js/*.js'
        ])
        .pipe(gulp_babel({
          presets: ['@babel/env']
        }))
        .pipe(gulp_concat('all.js'))
        .pipe(gulp.dest('./source/js'))
        .pipe(gulp_uglify())
        .pipe(gulp_rename('all.min.js'))
        .pipe(gulp.dest('./source/js'));
});

gulp.task('css', function() {
    return gulp.src('./source/_css/**/*.css')
        .pipe(gulp_concat('all.css'))
        .pipe(gulp.dest('./source/css'))
        .pipe(gulp_clean_css())
        .pipe(gulp_rename('all.min.css'))
        .pipe(gulp.dest('./source/css'));
})

gulp.task('default', gulp.parallel('js', 'css'))
