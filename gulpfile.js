var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var inline = require('gulp-inline')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

gulp.task('watch', function () {
  gulp.watch('src/**/*.+(scss|html|js)', ['sass', 'inline'])
})

gulp.task('default', function (c) {
  runSequence('sass', 'inline', c)
})

gulp.task('sass', function () {
  return gulp.src('src/sass/**.scss')
.pipe(sass({
  outputStyle: 'nested'
}).on('error', sass.logError))
.pipe(autoprefixer(autoprefixerOptions))
.pipe(gulp.dest('src/css/'))
})

gulp.task('inline', function () {
  return gulp.src('src/index.html')
.pipe(inline({
  base: '/src',
  js: uglify,
  css: minifyCss,
  disabledTypes: ['svg', 'img'],
  ignore: ['works.js']
}))
.pipe(htmlmin({
  collapseWhitespace: true,
  removeComments: false,
  minifyCSS: true,
  minifyJS: true
}))
.pipe(gulp.dest('dest'))
})
