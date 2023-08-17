import gulpif from 'gulp-if'
import inject from 'gulp-inject-string'

export function createTemplates(gulp, bs, hash) {
  const isDev = process.env.NODE_ENV === 'development'

  function templates() {
    return gulp.src('src/*.html')
      .pipe(gulpif(!isDev, inject.replace('main.js', `main.${hash}.js`)))
      .pipe(gulpif(!isDev, inject.replace('main.css', `main.${hash}.css`)))
      .pipe(gulp.dest('build'))
      .pipe(gulpif(isDev, bs.stream()))
  }

  return templates
}
