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
  // keyCodes 66 -> 60 and hZ 130 -> 1046
  var freq = 32 * keyCode - 2080 + 130;
  oscillator.frequency.value = freq > 1046 ? 1046 : freq < 130 ? 130 : freq;

  gainNode.connect(audioCtx.destination);
  oscillator.connect(gainNode);

  gainNode.gain.value = 0.02;
  oscillator.start();
  oscillator.stop(0.5);
};