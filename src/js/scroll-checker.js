export function scrollChecker() {
  window.addEventListener('scroll', function () {
    const scrollY = (
      window.scrollY ||
      document.documentElement.scrollTop
    )

    const items = document
      .querySelectorAll('#burger-menu .hamburger-nav__item')

    Array.from(items).forEach(function (item) {
      const refElement = document.querySelector(
        item
          .querySelector('.hamburger-nav__link')
          .getAttribute('href')
      )

      const positionTop = Math
        .round(refElement.getBoundingClientRect().top + scrollY)

      const offsetScrollY = scrollY + window.innerHeight / 4

      if (
        positionTop <= offsetScrollY &&
        positionTop + refElement.clientHeight > offsetScrollY
      ) {
        item.classList.add('hamburger-nav__item_current')
      } else {
        item.classList.remove('hamburger-nav__item_current')
      }
    })
  })
}
