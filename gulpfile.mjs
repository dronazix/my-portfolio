import gulp from 'gulp'
import browserSync from 'browser-sync'
import h from 'node-random-chars'

import {createClean} from './gulp-tasks/clean.mjs'
import {createTemplates} from './gulp-tasks/templates.mjs'
import {createStyle} from './gulp-tasks/style.mjs'
import {createScripts} from './gulp-tasks/scripts.mjs'
import {createFonts} from './gulp-tasks/fonts.mjs'
import {createImages} from './gulp-tasks/images.mjs'
import {createServe} from './gulp-tasks/serve.mjs'
import {createWatcher} from './gulp-tasks/watcher.mjs'
import {createCopy} from './gulp-tasks/copy.mjs'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const bs = browserSync.create()
const hash = h.create(16)

const clean = createClean()
const templates = createTemplates(gulp, bs, hash)
const style = createStyle(gulp, bs, hash)
const scripts = createScripts(gulp, bs, hash)
const fonts = createFonts(gulp)
const images = createImages(gulp, bs)
const serve = createServe(bs)
const watcher = createWatcher(gulp)
const copy = createCopy(gulp)

const build = gulp.series(
  clean,
  gulp.parallel(templates, style, scripts, fonts, images),
  copy
)

const dev = gulp.series(build, serve, watcher)

export {
  clean,
  templates,
  style,
  scripts,
  fonts,
  images
}

export {
  build,
  dev
}

export default dev
