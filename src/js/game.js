'use strict';

var elem = document.getElementById('gamecube');

document.addEventListener('mousemove', function (e) {
  requestAnimationFrame(function () {
    return move(e);
  });
});

function move(e) {
  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
}