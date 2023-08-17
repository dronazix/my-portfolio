import changed from 'gulp-changed'
import imagemin, {mozjpeg, optipng, svgo} from 'gulp-imagemin'
import gulpif from 'gulp-if'

export function createImages(gulp, bs) {
  const isDev = process.env.NODE_ENV === 'development'

  function images() {
    return gulp.src('src/images/**/*.{jpg,jpeg,png,svg,ico}')
      .pipe(changed('build/images'))
      .pipe(imagemin([
        mozjpeg({quality: 80, progressive: true}),
        optipng({optimizationLevel: 2}),
        svgo()
      ], {verbose: true}))
      .pipe(gulp.dest('build/images'))
      .pipe(gulpif(isDev, bs.stream()))
  }

  return images
}
