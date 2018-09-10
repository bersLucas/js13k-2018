const cube = document.getElementById('gc')
const box = document.getElementById('box')
const scoreBar = document.getElementById('fg')
const scoreMarker = document.getElementById('ma')
const scoreText = document.querySelector('#sc span')
let position = {x: 0, y: 0}                       // Track mouse position
let words = []                                    // Word list
let timestamp = 0                                 // Used for deltaTime
let score = new Score()

// Most used English (US) words.
const WORD_LIST = 'the,of,and,a,to,in,is,you,that,it,he,was,for,on,are,as,with,his,they,I,at,be,this,have,from,or,one,had,by,word,but,not,what,all,were,we,when,your,can,said,there,use,an,each,which,she,do,how,their,if,will,up,other,about,out,many,then,them,these,so,some,her,would,make,like,him,into,time,has,look,two,more,write,go,see,number,no,way,could,people,my,than,first,water,been,call,who,oil,its,now,find,long,down,day,did,get,come,made,may,part'.split(',')

// On keypress
const checkChar = function (e) {
  words[score.wordIndex].testKey(e)
  // Check if completed a word, if so, add points, add new word
  if (words[score.wordIndex].index >= words[score.wordIndex].word.length) {
    score.wordIndex++
    score.add(200)
    addWord()
  }
}

const rand = function (min, max) {
  return Math.floor(min + (Math.random() * max))
}

const updateWords = function () {
  if (words) {
    let innerHTML = ''

    // Parse every word and apply styles
    words.forEach(function (word) {
      innerHTML += `<span class="${word.index >= word.word.length ? 'current' : 'next'} ${word.style ? word.style : ''}">`
      Array.from(word.word).forEach(function (char, index) {
        let className = (index < word.index) ? 'good' : 'bad'
        innerHTML += `<span class="${className}">${char}</span>`
      })
      innerHTML += `</span>&nbsp;`
    })

    cube.children[1].innerHTML = innerHTML
  }
}

function Score () {
  this.gameScore = 0        // User's score
  this.gameTimer = 10000    // Time remaining
  this.wordIndex = 0        // Words complete

  // Add points & remaining time
  this.add = function (x) {
    this.gameTimer += x
    this.gameScore += x
  }
}

// Render score on screen
const updateScore = function (gameTimer) {
  const width = ((gameTimer / 10000) * 100) + '%'
  scoreBar.style.width = width
  scoreMarker.style.left = width
  scoreText.innerHTML = score.gameScore
}

function Word (word, style) {
  this.word = word + ' '    // Word string
  this.style = style        // CSS effects
  this.index = 0            // Current charecter position

  // Validate if the key pressed matches the current character
  this.testKey = function (e) {
    if (e.key === this.word[this.index]) {
      goodSound(e.keyCode)
      this.index++
      score.add(100)
      updateWords()
    } else {
      flashClass('bad', document.body, 255)
      badSound(e.keyCode)
      score.add(-200)
    }
  }
}

// Timer loop
const timerTick = function (_timestamp, skip) {
  // Check if pointer is locked on the game
  if (document.pointerLockElement === cube) {
    // True if you're unpausing. Prevents timer from jumping
    if (skip) {
      timestamp = _timestamp
    } else {
      score.gameTimer -= (_timestamp - timestamp)
      timestamp = _timestamp
    }
    updateScore(score.gameTimer)

    if (score.gameTimer < 0) {
      return alert('game over')
    }
    requestAnimationFrame(timerTick)
  } else {
    // Pointer is not locked on game, pause it.
    pause()
  }
}

const pause = function () {
  alert('game paused')
}

const flashClass = function (className, element, duration) {
  element.classList.add(className)
  setTimeout(function () {
    element.classList.remove(className)
  }, duration)
}

const init = function () {
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  updateWords()
}

init()
