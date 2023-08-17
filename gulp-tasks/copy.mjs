export function createCopy(gulp) {
  function copy() {
    return gulp.src(['content.json']).pipe(gulp.dest('build'))
  }
  
  return copy
}
