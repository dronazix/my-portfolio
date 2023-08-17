import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify-es'
import babelify from 'babelify'
import gulpif from 'gulp-if'

export function createScripts(gulp, bs) {
  const isDev = process.env.NODE_ENV === 'development'

  function scripts() {
    const b = browserify({
      entries: './src/js/main.js',
      debug: true
    })

    return b.transform(babelify, {presets: ['@babel/preset-env']})
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulpif(isDev, sourcemaps.init({loadMaps: true})))
      .pipe(uglify.default())
      .pipe(gulpif(isDev, sourcemaps.write('.')))
      .pipe(gulp.dest('build'))
      .pipe(gulpif(isDev, bs.stream()))
  }

  return scripts
}
