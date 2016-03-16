'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var paths       = require('./gulp-paths.json');
var wiredep     = require('wiredep').stream;
var del         = require('del');
var st          = require('st');
var runSequence = require('run-sequence');

// Search for js and css files created for injection in index.html
gulp.task('inject', function () {
  return gulp.src('./index.html', {cwd: paths.app})
    .pipe(plugins.inject(gulp.src(paths.js, {cwd: paths.app})
      .pipe(plugins.angularFilesort())))
    .pipe(plugins.inject(gulp.src(paths.css, {
      read: false,
      cwd: paths.app
    })))
    .pipe(gulp.dest(paths.app));
});

// Inject libraries via Bower in between of blocks "bower:xx" in index.html
gulp.task('wiredep', ['inject'], function () {
  return gulp.src('index.html', {cwd: paths.app})
    .pipe(wiredep({
      'ignorePath': '..'
    }))
    .pipe(gulp.dest(paths.app));
});

// Compress into a single file the ones in between of blocks "build:xx" in index.html
gulp.task('compress', ['wiredep'], function () {
  return gulp.src('index.html', {cwd: paths.app})
    .pipe(plugins.useref({ searchPath: ['./', paths.app] }))
    .pipe(plugins.if('*/scripts.min.js', plugins.replaceTask({
      patterns: [
        {
          match: 'debugInfoEnabled',
          replacement: 'false'
        },
        {
          match: 'debugLogEnabled',
          replacement: 'false'
        }
      ]
    })))
    .pipe(plugins.if('**/*.js', plugins.ngAnnotate()))
    .pipe(plugins.if('**/*.js', plugins.uglify({
      mangle: true
    }).on('error', plugins.util.log)))
    .pipe(plugins.if('**/*.css', plugins.cssnano()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('templates:build', function () {
  return gulp.src(paths.views, {cwd: paths.app})
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(plugins.angularTemplatecache({
      module: 'weatherApp',
      moduleSystem: 'IIFE'
    }))
    .pipe(plugins.uglify({
      mangle: true
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('templates:concat', ['templates:build'], function () {
  return gulp.src([paths.jsMin, paths.templatesCache], {cwd: paths.dist})
    .pipe(plugins.concat(paths.jsMin))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('templates:clean', ['templates:concat'], function () {
  return del(paths.dist + paths.templatesCache);
});

// Copies the assets into the dist folder
gulp.task('copy:assets', function () {
  return gulp.src('assets*/**', {cwd: paths.app})
    .pipe(gulp.dest(paths.dist));
});

// Looks for code correctness errors in JS and prints them
gulp.task('jshint', function() {
  return gulp.src(paths.js, {cwd: paths.app})
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Looks for code style errors in JS and prints them
gulp.task('jscs', function () {
  return gulp.src(paths.js, {cwd: paths.app})
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

// Cleans the dist folder
gulp.task('clean:dist', function () {
  return del(paths.dist + '**/*');
});

// Watch changes on application files
gulp.task('watch', function() {
  gulp.watch(paths.css, {cwd: paths.app}, ['inject']);
  gulp.watch(paths.js, {cwd: paths.app}, ['jshint', 'jscs', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
  plugins.watch('**/*.html', {cwd: paths.app})
    .pipe(plugins.connect.reload());
});

// Starts a development web server
gulp.task('server', function () {
  plugins.connect.server({
    root: paths.app,
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        st({
          path: 'bower_components',
          url: '/bower_components'
        })
      ];
    }
  });
});

// Starts a server using the production build
gulp.task('server-dist', ['build'], function () {
  plugins.connect.server({
    root: paths.dist,
    hostname: '0.0.0.0',
    port: 8080
  });
});

// Production build
gulp.task('build', function (done) {
  runSequence('jshint', 'jscs', 'clean:dist', 'compress', 'templates:clean', 'copy:assets', done);
});

// Generates the documentation
gulp.task('ngdocs', function () {
  var options = {
    title: "Weather Web App Documentation",
    html5Mode: false
  };
  return gulp.src(paths.js, {cwd: paths.app})
    .pipe(plugins.ngdocs.process(options))
    .pipe(gulp.dest('./docs'));
});

// Starts a server with the docs
gulp.task('server-docs', ['ngdocs'], function () {
  plugins.connect.server({
    root: './docs',
    hostname: '0.0.0.0',
    port: 8081
  });
});

gulp.task('default', ['inject', 'wiredep', 'server', 'watch']);
