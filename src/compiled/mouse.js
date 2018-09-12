'use strict';

start.addEventListener('dblclick', function (e) {
  game.style.top = e.clientY + 'px';
  game.style.left = e.clientX + 'px';
  position.x = e.clientX;
  position.y = e.clientY;
  setTimeout(function () {
    game.style.top = '0px';
    game.style.left = '0px';
    game.style.transform = 'scale(1)';
  }, 500);

  cube.requestPointerLock();
});

document.addEventListener('pointerlockchange', function (e) {
  if (document.pointerLockElement === cube) {
    initKeyboard();
    document.addEventListener('mousemove', updatePos, false);
    document.addEventListener('click', mouseClick, false);
  } else {
    document.removeEventListener('mousemove', updatePos, false);
  }
});

var updatePos = function updatePos(e) {
  position.x += e.movementX;
  position.y += e.movementY;

  requestAnimationFrame(draw);
};

var mouseClick = function mouseClick(e) {
  if (online) {
    return;
  } else {
    // Check if you click on the VPN box
    var bounds = vpn.getBoundingClientRect();
    if (position.x > bounds.x + 25 && position.y > bounds.y + 25 && position.y < bounds.y + 75) {
      online = true;
      bd.style.opacity = null;
      vpn.style.top = null;
      vpn.style.right = null;
      vpn.className = 'online';
    }
  }
};

// Move Cursor
var draw = function drawBoxPositions() {
  box.style.cssText = 'transform: translateX(' + position.x + 'px) translateY(' + position.y + 'px)';
};