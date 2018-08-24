'use strict';

var cube = document.getElementById('gamecube');
var box = document.getElementById('box');
var scoreBar = document.getElementById('foreground');
var scoreMarker = document.getElementById('marker');
var scoreText = document.querySelector('#score span');
var position = { x: 0, y: 0 // Track mouse position
};var words = []; // Word list
var timestamp = 0; // Used for deltaTime
var score = new Score();

// Most used English (US) words.
var WORD_LIST = 'the,of,and,a,to,in,is,you,that,it,he,was,for,on,are,as,with,his,they,I,at,be,this,have,from,or,one,had,by,word,but,not,what,all,were,we,when,your,can,said,there,use,an,each,which,she,do,how,their,if,will,up,other,about,out,many,then,them,these,so,some,her,would,make,like,him,into,time,has,look,two,more,write,go,see,number,no,way,could,people,my,than,first,water,been,call,who,oil,its,now,find,long,down,day,did,get,come,made,may,part'.split(',');

var rand = function rand(min, max) {
  return Math.floor(min + Math.random() * max);
};

var checkChar = function checkChar(key) {
  words[score.wordIndex].testKey(key);
  if (words[score.wordIndex].index >= words[score.wordIndex].word.length) {
    score.wordIndex++;
    score.add(200);
    words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  }
};

var updateWords = function updateWords() {
  if (words) {
    var innerHTML = '';

    words.forEach(function (word) {
      innerHTML += '<span class="' + (word.index >= word.word.length ? 'current' : 'next') + '">';
      Array.from(word.word).forEach(function (char, index) {
        var className = index < word.index ? 'good' : 'bad';
        innerHTML += '<span class="' + className + '">' + char + '</span>';
      });
      innerHTML += '</span>&nbsp;';
    });

    cube.children[0].innerHTML = innerHTML;
  }
};

function Score() {
  this.gameScore = 0;
  this.gameTimer = 10000;
  this.wordIndex = 0;

  this.add = function (x) {
    this.gameTimer += x;
    this.gameScore += x;
    scoreText.innerHTML = this.gameScore;
  };
}

function Word(word) {
  this.word = word;
  this.index = 0;

  this.testKey = function (key) {
    if (key === this.word[this.index]) {
      this.index++;
      score.add(100);
      updateWords();
    }
  };
}

var timerTick = function timerTick(_timestamp) {
  score.gameTimer -= _timestamp - timestamp;
  timestamp = _timestamp;
  updateScore(score.gameTimer);

  if (score.gameTimer < 0) {
    return alert('game over');
  }
  requestAnimationFrame(timerTick);
};

var updateScore = function updateScore(gameTimer) {
  var width = gameTimer / 10000 * 100 + '%';
  scoreBar.style.width = width;
  scoreMarker.style.left = width;
};

var init = function init() {
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  updateWords();
};

init();