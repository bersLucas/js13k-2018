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
    document.addEventListener('click', mouseClick, false)
  } else {
    document.removeEventListener('mousemove', updatePos, false)
  }
})

const updatePos = function (e) {
  position.x += e.movementX
  position.y += e.movementY

  requestAnimationFrame(draw)
}

const mouseClick = function (e) {
  if (online) {
    return
  } else {
    // Check if you click on the VPN box
    let bounds = vpn.getBoundingClientRect()
    if (position.x > bounds.x + 25 && position.y > bounds.y + 25 && position.y < bounds.y + 75) {
      online = true
      bd.style.opacity = null
      vpn.style.top = null
      vpn.style.right = null
      vpn.className = 'online'
    }
  }
}

// Move Cursor
const draw = function drawBoxPositions () {
  box.style.cssText = `transform: translateX(${position.x}px) translateY(${position.y}px)`
}
