export function createServe(bs) {
  function serve(cb) {
    bs.init({
      server: {
        baseDir: './build',
      },
      serveStatic: ['.'],
      notify: false
    })

    cb()
  }

  return serve
}
