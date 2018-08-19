/*
Mouse input
*/
const cube = document.getElementById('gamecube')  // Cube element
const box = document.getElementById('box')        // Mouse cursor
let position = {x: 0, y: 0}                       // Track mouse position
let words = []                                    // Word list

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

/*
Keyboard input
*/
document.onkeydown = keyPress
function keyPress (e) {
  checkChar(e.key)
}

/*
Game
*/

// Most used English (US) words.
const WORD_LIST = ['the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water', 'been', 'call', 'who', 'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part']
let score = 0

const rand = function (min, max) {
  return Math.floor(min + (Math.random() * max))
}

const checkChar = function (key) {
  words[score].testKey(key)
  if (words[score].index >= words[score].word.length) {
    score++
    words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  }
}

const updateWords = function () {
  if (words) {
    let innerHTML = ''

    words.forEach(function (word) {
      innerHTML += `<span class="${word.index >= word.word.length ? 'current' : 'next'}">`
      Array.from(word.word).forEach(function (char, index) {
        let className = (index < word.index) ? 'good' : 'bad'
        innerHTML += `<span class="${className}">${char}</span>`
      })
      innerHTML += `</span>&nbsp;`
    })

    cube.children[0].innerHTML = innerHTML
  }
}

function Word (word) {
  this.word = word
  this.index = 0

  this.testKey = function (key) {
    if (key === this.word[this.index]) {
      this.index++
      updateWords()
    }
  }
}

function init () {
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  updateWords()
}

init()
