import Masonry from 'masonry-layout'
import {INIT_NUMBER_WORK_CARDS} from './constants.js'

const worksEmpty = document.querySelector('#works .works__empty')
const worksGrid = document.querySelector('#works .works__grid')
const workCardTemplate = document.querySelector('#work-card-template')
const tagTemplate = workCardTemplate.querySelector('.work-card__tag')
const buttonShowMore = document.querySelector('#show-more-works')

const msnry = new Masonry(worksGrid, {
  itemSelector: '.works__work-card',
  columnWidth: '.works__work-card-sizer',
  gutter: '.works__gutter-sizer',
  percentPosition: true,
  transitionDuration: 0
})

function createWorkCard(manifest) {
  const cloneWorkCardTemplate = workCardTemplate.cloneNode(true)

  cloneWorkCardTemplate.id = ''
  cloneWorkCardTemplate.style.display = ''

  const pin = cloneWorkCardTemplate.querySelector('.work-card__pin')
  const image = cloneWorkCardTemplate.querySelector('.work-card__img')
  const title = cloneWorkCardTemplate.querySelector('.work-card__title')
  const description = cloneWorkCardTemplate.querySelector('.work-card__desc')
  const tags = cloneWorkCardTemplate.querySelector('.work-card__tags')
  const website = cloneWorkCardTemplate.querySelector('.work-card__link_web')
  const github = cloneWorkCardTemplate.querySelector('.work-card__link_github')

  if (manifest.pin) {
    pin.classList.remove('work-card__pin_disabled')
  }

  if (manifest.image_url) {
    image.setAttribute('src', manifest.image_url)
  } else {
    image.remove()
  }

  title.innerText = manifest.name
  description.innerText = manifest.description

  tags.innerHTML = ''

  manifest.tags.forEach(function (tagName) {
    const cloneTagTemplate = tagTemplate.cloneNode(true)

    cloneTagTemplate.innerText = tagName

    tags.appendChild(cloneTagTemplate)
  })

  if (manifest.website_url === '') {
    website.classList.add('help-link-disabled')
  }

  website.setAttribute('href', manifest.website_url)

  if (manifest.github_url === '') {
    github.classList.add('help-link-disabled')
  }

  github.setAttribute('href', manifest.github_url)

  return cloneWorkCardTemplate
}

function createAndAppendWorkCards(manifests, number) {
  manifests.splice(0, number).forEach(function (manifest) {
    const workCard = createWorkCard(manifest)

    worksGrid.append(workCard)
    msnry.appended(workCard)
  })
}

export function displayWorks(manifests) {
  if (Array.isArray(manifests)) {
    manifests = JSON.parse(JSON.stringify(manifests))
  } else {
    manifests = []
  }

  const length = manifests.length

  if (length) {
    worksEmpty.classList.add('works__empty_disabled')
    worksGrid.classList.remove('works__grid_disabled')

    msnry.layout()

    manifests.sort(function (a, b) {
      return (
        (a.pin === 0) - (b.pin === 0) || Math.abs(a.pin) - Math.abs(b.pin)
      ) || b.created_at.getTime() - a.created_at.getTime()
    })

    createAndAppendWorkCards(manifests, INIT_NUMBER_WORK_CARDS)

    if (length > 6) {
      buttonShowMore.classList.remove('works__button_disabled')

      buttonShowMore.addEventListener('click', function buttonShowMoreHandler() {
        createAndAppendWorkCards(manifests)

        buttonShowMore.classList.add('works__button_disabled')

        buttonShowMore.removeEventListener('click', buttonShowMoreHandler)
      })
    }
  }
}
