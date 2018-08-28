const cube = document.getElementById('gamecube')
const box = document.getElementById('box')
const scoreBar = document.getElementById('foreground')
const scoreMarker = document.getElementById('marker')
const scoreText = document.querySelector('#score span')
let position = {x: 0, y: 0}                       // Track mouse position
let words = []                                    // Word list
let timestamp = 0                                 // Used for deltaTime
let score = new Score()

// Most used English (US) words.
const WORD_LIST = 'the,of,and,a,to,in,is,you,that,it,he,was,for,on,are,as,with,his,they,I,at,be,this,have,from,or,one,had,by,word,but,not,what,all,were,we,when,your,can,said,there,use,an,each,which,she,do,how,their,if,will,up,other,about,out,many,then,them,these,so,some,her,would,make,like,him,into,time,has,look,two,more,write,go,see,number,no,way,could,people,my,than,first,water,been,call,who,oil,its,now,find,long,down,day,did,get,come,made,may,part'.split(',')

const rand = function (min, max) {
  return Math.floor(min + (Math.random() * max))
}

const checkChar = function (e) {
  words[score.wordIndex].testKey(e)
  if (words[score.wordIndex].index >= words[score.wordIndex].word.length) {
    score.wordIndex++
    score.add(200)
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

function Score () {
  this.gameScore = 0
  this.gameTimer = 10000
  this.wordIndex = 0

  this.add = function (x) {
    this.gameTimer += x
    this.gameScore += x
    scoreText.innerHTML = this.gameScore
  }
}

function Word (word) {
  this.word = word
  this.index = 0

  this.testKey = function (e) {
    if (e.key === this.word[this.index]) {
      goodSound(e.keyCode)
      this.index++
      score.add(100)
      updateWords()
    } else {
      badSound(e.keyCode)
      score.add(-200)
    }
  }
}

const timerTick = function (_timestamp) {
  score.gameTimer -= (_timestamp - timestamp)
  timestamp = _timestamp
  updateScore(score.gameTimer)

  if (score.gameTimer < 0) {
    return alert('game over')
  }
  requestAnimationFrame(timerTick)
}

const updateScore = function (gameTimer) {
  const width = ((gameTimer / 10000) * 100) + '%'
  scoreBar.style.width = width
  scoreMarker.style.left = width
}

const init = function () {
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  updateWords()
}

init()
