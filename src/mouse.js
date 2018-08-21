cube.addEventListener('click', (e) => {
  cube.requestPointerLock()
})

document.addEventListener('pointerlockchange', (e) => {
  if (document.pointerLockElement === cube) {
    document.addEventListener('mousemove', updatePos, false)
  } else {
    document.removeEventListener('mousemove', updatePos, false)
  }
})

const updatePos = function (e) {
  position.x += e.movementX
  position.y += e.movementY

  requestAnimationFrame(draw)
}

const draw = function drawBoxPositions () {
  box.style.cssText = `transform: translateX(${position.x}px) translateY(${position.y}px)`
}
