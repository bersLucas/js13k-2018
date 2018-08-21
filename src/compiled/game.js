'use strict';

var cube = document.getElementById('gamecube'); // Cube element
var box = document.getElementById('box'); // Mouse cursor
var position = { x: 0, y: 0 // Track mouse position
};var words = []; // Word list

// Most used English (US) words.
var WORD_LIST = 'the,of,and,a,to,in,is,you,that,it,he,was,for,on,are,as,with,his,they,I,at,be,this,have,from,or,one,had,by,word,but,not,what,all,were,we,when,your,can,said,there,use,an,each,which,she,do,how,their,if,will,up,other,about,out,many,then,them,these,so,some,her,would,make,like,him,into,time,has,look,two,more,write,go,see,number,no,way,could,people,my,than,first,water,been,call,who,oil,its,now,find,long,down,day,did,get,come,made,may,part'.split(',');
var score = 0;

var rand = function rand(min, max) {
  return Math.floor(min + Math.random() * max);
};

var checkChar = function checkChar(key) {
  words[score].testKey(key);
  if (words[score].index >= words[score].word.length) {
    score++;
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

function Word(word) {
  this.word = word;
  this.index = 0;

  this.testKey = function (key) {
    if (key === this.word[this.index]) {
      this.index++;
      updateWords();
    }
  };
}

function init() {
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]));
  updateWords();
}

init();