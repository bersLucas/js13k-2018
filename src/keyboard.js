/*
Keyboard input
*/
document.onkeydown = keyPress
function keyPress (e) {
  e.preventDefault()
  checkChar(e)
}
