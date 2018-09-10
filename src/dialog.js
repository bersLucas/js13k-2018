const rand = function (min, max) {
  return Math.floor(min + (Math.random() * max))
}

const addWord = function () {
  if (rand(0, 10) === 1) {
    let SELECTED_DIALOG = dialog[rand(0, dialog.length)]
    SELECTED_DIALOG.words.split(' ').forEach(function (word) {
      words.push(new Word(unROT13(word), SELECTED_DIALOG.effect))
    })
  } else {
    words.push(new Word(WORD_LIST[rand(0, WORD_LIST.length)]))
  }
}

const unROT13 = function (word) {
  // http://stackoverflow.com/a/617685/987044
  function rot (s, i) {
    return s.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26)
    })
  }

  return rot(word, 13)
}

const dialog = [
  {
    words: 'jura ner lbh tbvat gb fgbc oynzvat guvatf gung ner bhg bs lbhe pbageby?',
    effect: 'shake1'
  },
  {
    words: 'gurer vf abguvat lbh pna pbageby',
    effect: 'shake1'
  },
  {
    words: 'v pna\'g fyrrc',
    effect: 'shake1'

  },
  {
    words: 'yrg zr fyrrc',
    effect: 'shake1'

  },
  {
    words: 'yrgzrfyrrc yrgzrfyrrc yrgzrfyrrc',
    effect: 'shake1'

  },
  {
    words: 'gur bofreire vf abg frcnengr sebz gur bowrpg orvat bofreirq',
    effect: 'shake2'

  },
  {
    words: 'yrg zr va',
    effect: 'shake2'

  },
  {
    words: 'YRG ZR VA YRG ZR VA YRG ZR VA',
    effect: 'shake2'

  },
  {
    words: 'JURER NER LBH',
    effect: 'shake2'
  },
  {
    words: 'V\’yy tvir lbh zl rgreany fbhy',
    effect: 'shake2'
  }
]
