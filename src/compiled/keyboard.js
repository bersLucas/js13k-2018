'use strict';

/*
Keyboard input
*/
var initKeyboard = function initKeyboard() {
  document.onkeydown = function (e) {
    if (e.key === 'Enter') {
      document.onkeydown = keyPress;
      init();
    }
  };

  function keyPress(e) {
    e.preventDefault();
    checkChar(e);
  }
};