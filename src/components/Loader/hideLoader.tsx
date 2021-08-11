export default function hideLoader() {
  setTimeout(() => {
    const loader: HTMLElement = document.querySelector('.___loader')
    loader.addEventListener('animationend', () => {
      loader.style.display = 'none'
    })
    loader.classList.add('___loader--hidden')
  }, 100)
}
