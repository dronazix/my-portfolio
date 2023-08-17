import gulpif from 'gulp-if'

export function createTemplates(gulp, bs) {
  const isDev = process.env.NODE_ENV === 'development'

  function templates() {
    return gulp.src('src/*.html')
      .pipe(gulp.dest('build'))
      .pipe(gulpif(isDev, bs.stream()))
  }

  return templates
}
