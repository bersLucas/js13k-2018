const elem = document.getElementById('gamecube')

document.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => move(e))
})

function move (e) {
  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px')
  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px')
}
