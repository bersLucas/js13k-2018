Here is my current gulpfile, built to compile down to ES5, minify, and inline all files into a single HTML file.

This shouldn't be used for*all* projects, but I feel like going through the process might help some people who are confused with the gulp process.

<a href="https://gulpjs.com/" target="_blank">Gulp</a> is an automator for node.js. It runs scripts on command to move/edit/change/minify code. 

This workflow assumes you have the following installed:

* <a href="https://nodejs.org/en/" target="_blank">Node.js</a> - A javascript runtime
* <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> - A package manager

Create a folder for your project and then run the following commands in order:

```bash
# Initialize a project
yarn init

# Babel and Javascript compiling 
yarn add -D babel-core babel-preset-env  

# Sass and CSS compiling
yarn add -D  gulp-autoprefixer gulp-minify-css gulp-sass

# Minification
yarn add -D gulp-htmlmin gulp-inline gulp-uglify run-sequence
```

This initializes a project and adds the following development dependencies to your project:
* babel-core - Compile modern javascript for browsers that don't support it yet
* babel-preset-env  - Environment presets for babel. 
* gulp - The task runner
* gulp-autoprefixer - Auto prefix CSS files.
* gulp-htmlmin - Minify HTML files
* gulp-inline - Inline **`<script>`** and **`<style>`** tags in the HTML file
* gulp-minify-css - Minify CSS files
* gulp-sass - Compile .scss (sass) files
* gulp-uglify - Minify JS files 
* run-sequence - Run commands in sequence

Next, we're going to create a file named **gulpfile.js** at the root of our project, and require the packages we installed in the previous step:

```javascript
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var inline = require('gulp-inline')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')
var babel = require('gulp-babel')
```

Under these lines, we will write gulp tasks, which take the following format:

```javascript
gulp.task('hi', function () {
  console.log('hello world');
})
```

The cove above will print out 'hello world' to your terminal if you run the command **gulp hi** in your project folder.

Here are my gulp tasks that I have set up in my gulpfile:

## Babel
```javascript
gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('src/compiled'))
})
```
This command takes all javascript files in the *src/* folder, uses babel to compile it, then spits out the output to *src/compiled*

## Sass

```javascript
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

gulp.task('sass', function () {
  return gulp.src('src/**.scss')
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('src/compiled'))
})
```

This takes every file in my **src/** folder that ends with .scss, runs sass on it in a nested style, runs autoprefixer on it, then spits out the output to *src/compiled*

## Inline 
```javascript
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
})

```

This takes the HTML file located in **src/index.html**,  inlines all **`<script>`** and **`<style>`** tags, minifies CSS/javascript, then minifies the .html file itself. The final file will be available at *dist/index.html*

----

Date: 2018-08-21