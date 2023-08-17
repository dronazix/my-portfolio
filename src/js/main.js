import {getContent} from './get-content.js'
import {getManifestFromRepos} from './get-manifest-from-repos.js'
import {smoothScroll} from './smooth-scroll.js'
import {upScroll} from './up-scroll.js'
import {burgerMenu} from './burger-menu.js'
import {scrollChecker} from './scroll-checker.js'
import {displayContent} from './display-content.js'
import {displayWorks} from './display-works.js'
import {disablePreloader} from './preloader.js'
import {displayError} from './display-error.js'

getContent()
  .then(function (content) {
    return getManifestFromRepos(content.github.username)
      .then((manifest) => ({content, manifest}))
  })
  .then(function ({content, manifest}) {
    smoothScroll()
    upScroll()
    burgerMenu()
    scrollChecker()
    displayContent(content)
    displayWorks(manifest)
    disablePreloader()
  })
  .catch(function (error) {
    displayError()

    console.error(error)
    console.log(error.response)
  })

window.addEventListener('error', function (event) {
  displayError()

  console.error(event.error)
  console.log(event.error.response)
})
