start.addEventListener('dblclick', (e) => {
  game.style.top = e.clientY + 'px'
  game.style.left = e.clientX + 'px'
  position.x = e.clientX
  position.y = e.clientY
  setTimeout(function () {
    game.style.top = '0px'
    game.style.left = '0px'
    game.style.transform = 'scale(1)'
  }, 500)

  cube.requestPointerLock()
})

document.addEventListener('pointerlockchange', (e) => {
  if (document.pointerLockElement === cube) {
    initKeyboard()
    document.addEventListener('mousemove', updatePos, false)
    // document.addEventListener('click', clickFunc, false)
    document.removeEventListener('mousemove', updatePos, false)
  }
})

const updatePos = function (e) {
  position.x += e.movementX
  position.y += e.movementY

  requestAnimationFrame(draw)
}

const clickFunc = function (e) {
  if (online) {
    return
  }
}

const draw = function () {
  box.style.cssText = `transform: translateX(${position.x}px) translateY(${position.y}px)`
}
