import mergeStream from 'merge-stream'
import changed from 'gulp-changed'
import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'

export function createFonts(gulp) {
  function fonts() {
    const ttfToWoff = gulp.src('src/fonts/**/*.ttf')
      .pipe(changed('build/fonts', {extension: '.woff'}))
      .pipe(ttf2woff())

    const ttfToWoff2 = gulp.src('src/fonts/**/*.ttf')
      .pipe(changed('build/fonts', {extension: '.woff2'}))
      .pipe(ttf2woff2())

    return mergeStream(ttfToWoff, ttfToWoff2).pipe(gulp.dest('build/fonts'))
  }

  return fonts
}
