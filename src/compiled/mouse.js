'use strict';

cube.addEventListener('click', function (e) {
  cube.requestPointerLock();
});

document.addEventListener('pointerlockchange', function (e) {
  if (document.pointerLockElement === cube) {
    document.addEventListener('mousemove', updatePos, false);
  } else {
    document.removeEventListener('mousemove', updatePos, false);
  }
});

var updatePos = function updatePos(e) {
  position.x += e.movementX;
  position.y += e.movementY;

  requestAnimationFrame(draw);
};

var draw = function drawBoxPositions() {
  box.style.cssText = 'transform: translateX(' + position.x + 'px) translateY(' + position.y + 'px)';
};