const rand = function (min, max) {
  return Math.floor(min + (Math.random() * max))
}

const addWord = function () {
  if (rand(0, 10) === 1) {
    online = false
    bd.style.opacity = 0.7
    vpn.style.top = rand(0, window.innerHeight) + 'px'
    vpn.style.right = rand(0, window.innerWidth) + 'px'
    vpn.className = 'offline'
  }

  if (rand(0, 10) === 1) {
    let SELECTED_DIALOG = dialog[rand(0, dialog.length)]

    const pull = rand(1, 4)
    if (pull === 1) {
      flashClass('pull_left', cube, 1500)
    } else if (pull === 2) {
      flashClass('pull_right', cube, 1500)
    }

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
    words: 'cyrnfr fgbc',
    effect: 'shake2'
  },
  {
    words: 'fgbc oynzvat lbhefrys',
    effect: 'shake1'
  },
  {
    words: 'vg\'f bhg bs lbhe pbageby',
    effect: 'shake1'
  },
  {
    words: 'v pna\'g fyrrc',
    effect: 'shake1'

  },
  {
    words: 'yrg zr fyrrc',
    effect: 'shake3'

  },
  {
    words: 'yrg zr fyrrc',
    effect: 'shake3'

  },
  {
    words: 'v bofreir',
    effect: 'shake3'

  },
  {
    words: 'yrg zr va',
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
