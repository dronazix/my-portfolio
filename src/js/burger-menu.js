export function burgerMenu() {
  const button = document.querySelector('#burger-button')
  const menu = document.querySelector('#burger-menu')
  const links = menu.querySelectorAll('a')
  const content = document.querySelector('#page-content')

  function toggleBurger() {
    button.classList.toggle('hamburger-button_active')
    menu.classList.toggle('page__hamburger-menu_active')
    content.classList.toggle('page__content_border')
    content.classList.toggle('page__content_translate')
  }

  function buttonHandler(event) {
    event.preventDefault()

    toggleBurger()
  }

  function contentHandler(event) {
    if (menu.classList.contains('page__hamburger-menu_active')) {
      event.preventDefault()

      toggleBurger()
    }
  }

  Array.from(links)
    .forEach((link) => link.addEventListener('click', toggleBurger))

  button.addEventListener('click', buttonHandler)
  content.addEventListener('click', contentHandler)
}
