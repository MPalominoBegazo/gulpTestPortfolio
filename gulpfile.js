const gulp = require('gulp');
const minifyHTML = require('gulp-minify-html-2');
const cleanCSS = require('gulp-clean-css');
const cmq = require('crlab-gulp-combine-media-queries');
const argv = require('yargs').argv;
const git = require('gulp-git');
const runSequence = require('run-sequence');

gulp.task('init', function() {
  console.log(argv.m);
});

gulp.task('add', function() {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function(){
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});
gulp.task('minify-html', function () {
    var opts = { comments: true, spare: true };

    gulp.src('./*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./'))
});

gulp.task('minify-css', () => {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css/'));
})

gulp.task('cmq', function () {
    gulp.src('./css/*.css')
        .pipe(cmq({
            log: true
        }))
        .pipe(gulp.dest('./css/'));
});

