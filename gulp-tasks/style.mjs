import sourcemaps from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'

const sass = gulpSass(dartSass)

export function createStyle(gulp, bs, hash) {
  const isDev = process.env.NODE_ENV === 'development'

  function style() {
    return gulp.src('src/scss/main.scss')
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(sass.sync({outputStyle: isDev ? 'expanded' : 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulpif(!isDev, cleanCSS({level: 2})))
      .pipe(gulpif(isDev, sourcemaps.write('.')))
      .pipe(gulpif(!isDev, rename(`main.${hash}.css`)))
      .pipe(gulp.dest('build'))
      .pipe(gulpif(isDev, bs.stream()))
  }

  return style
}
