'use strict';

var goodSound = function goodSound(keyCode) {
  playSound(keyCode, 'sine');
};

var badSound = function badSound(keyCode) {
  playSound(keyCode, 'square');
};

var playSound = function playSound(keyCode, type) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.type = type;
  // keyCodes 66 -> 60 and hZ 200 -> 800
  var freq = 25 * keyCode - 1650 + 200;
  oscillator.frequency.value = freq > 800 ? 800 : freq < 200 ? 200 : freq;

  gainNode.connect(audioCtx.destination);
  oscillator.connect(gainNode);

  gainNode.gain.value = 0.1;
  oscillator.start();
  oscillator.stop(0.5);

  console.log(audioCtx);
};