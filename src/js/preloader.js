import {DELAY_AFTER_PRELOADER} from './constants.js'

const preloader = document.querySelector('.page__preloader')
const body = document.body
const animations = document.querySelectorAll('.animation')

export function disablePreloader() {
  preloader.classList.add('page__preloader_disabled')

  setTimeout(function () {
    body.classList.remove('page_no-scroll')
  }, DELAY_AFTER_PRELOADER)

  Array.from(animations).forEach(function (animation) {
    animation.style.animationPlayState = 'running'
  })
}
