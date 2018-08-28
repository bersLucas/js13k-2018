const goodSound = function (keyCode) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  var oscillator = audioCtx.createOscillator()
  // keyCodes 66 -> 60 and hZ 200 -> 800
  oscillator.frequency.value = ((25 * keyCode) - 1650) + 200
  oscillator.connect(audioCtx.destination)
  oscillator.start()
  oscillator.stop(0.5)
}

const badSound = function (keyCode) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  var oscillator = audioCtx.createOscillator()
  oscillator.type = 'square'
  // keyCodes 66 -> 60 and hZ 200 -> 800
  oscillator.frequency.value = ((25 * keyCode) - 1650) + 200
  oscillator.connect(audioCtx.destination)
  oscillator.start()
  oscillator.stop(0.5)
}
