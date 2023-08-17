export function smoothScroll() {
  const smoothLinks = document.querySelectorAll('.smooth-scroll')

  Array.from(smoothLinks).forEach(function(smoothLink) {
    smoothLink.addEventListener('click', function(event) {
      event.preventDefault()

      const id = smoothLink.getAttribute('href')

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  })
}
