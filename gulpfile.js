var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var inline = require('gulp-inline')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')
var babel = require('gulp-babel')

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

gulp.task('watch', function () {
  gulp.watch('src/**/*.+(scss|html|js)', ['default'])
})

gulp.task('default', function (c) {
  runSequence(['sass', 'babel'], 'inline', c)
})

function swallowError (error) {
  this.emit('end')
}

gulp.task('sass', function () {
  return gulp.src('src/**.scss')
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('src/compiled'))
    .on('error', swallowError)
})

gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('src/compiled'))
    .on('error', swallowError)
})

gulp.task('inline', function () {
  return gulp.src('src/index.html')
  .pipe(inline({
    base: '/src',
    js: uglify,
    css: minifyCss,
    disabledTypes: ['svg', 'img'],
    ignore: []
  }))
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: false,
    minifyCSS: true,
    minifyJS: true
  }))
  .pipe(gulp.dest('dist'))
  .on('error', swallowError)
})
