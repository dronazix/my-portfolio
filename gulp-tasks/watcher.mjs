export function createWatcher(gulp) {
  function watcher(cb) {
    gulp.watch('src/*.html', gulp.parallel('templates'))
    gulp.watch('src/scss/**/*.scss', gulp.parallel('style'))
    gulp.watch('src/fonts/**/*.ttf', gulp.parallel('fonts'))
    gulp.watch('src/js/**/*.js', gulp.parallel('scripts'))
    gulp.watch('src/images/**/*.{jpg,jpeg,png,svg,ico}', gulp.parallel('images'))

    cb()
  }

  return watcher
}
