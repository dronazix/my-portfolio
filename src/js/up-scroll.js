export function upScroll() {
  const upButton = document.querySelector('#up-button')
  const heroSection = document.querySelector('#hero')

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop

    if (scrollY >= heroSection.clientHeight) {
      upButton.classList.remove('page__up-button_hide')
    } else {
      upButton.classList.add('page__up-button_hide')
    }
  })
}
