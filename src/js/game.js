'use strict';

var elem = document.getElementById('gamecube');
var box = document.getElementById('box');
var position = { x: 0, y: 0

  // Initalize PointerLock API.
};elem.addEventListener('click', function (e) {
  elem.requestPointerLock();
});

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === elem || document.mozPointerLockElement === elem) {
    document.addEventListener('mousemove', updatePosition, false);
  } else {
    document.removeEventListener('mousemove', updatePosition, false);
  }
}

function updatePosition(e) {
  position.x += e.movementX;
  position.y += e.movementY;

  requestAnimationFrame(draw);
}

function draw() {
  box.style.cssText = 'transform: translateX(' + position.x + 'px) translateY(' + position.y + 'px)';
}