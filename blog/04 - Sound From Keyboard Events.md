The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank">Web Audio API</a> allows browsers to play and render sound directly, being as specific as specifying exact frequency and chaining together effects and sounds with <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioNode" target="_blank">AudioNodes</a>.

For my project, I wanted a unique sound to play from each keypress, since I didn't have a real preference as to what the exact sound was, I could use Web Audio API's default parameters and made a sound synthesizer in only 391bytes.

To start, let's look at the <a href="https://developer.mozilla.org/en-US/docs/Web/Events/keypress" target="_blank">keypress</a> event, which we can watch with an easy `document.onkeydown`.

```javascript
document.onkeydown = keyPress
function keyPress (e) {
  //press the "n" button
  console.log(e)
  /*
  {
    target: [dom element],
    type: "keydown",
    key: "n",
    keyCode: 78,
    shiftKey: false,
   ....
  }
 */
}
```

In my game, the value `key` is used to determine which button has been pressed. The `keyCode` value is what I'll be using to create the sound effect. All lowercase buttons on the keyboard create a key code from 65 -> 97. Assuming a user presses only these keys, and we want our oscillator to from 130Hz (about C<sub>3</sub>) to 1046Hz (about C<sub>6</sub>), we can use the following equation to determine the frequency of our note generated from the keypress: 

<math xmlns='http://www.w3.org/1998/Math/MathML'>
 <mrow>
  <mrow>
   <mo>(</mo>
   <mrow>
    <mrow>
     <mn>32</mn>
     <mo>&#8290;</mo>
     <mi>x</mi>
    </mrow>
    <mo>-</mo>
    <mn>2080</mn>
   </mrow>
   <mo>)</mo>
  </mrow>
  <mo>+</mo>
  <mn>130</mn>
 </mrow>
</math>


(This function can be written in javascript as `((32 * e.keypress) - 2080) + 130`.)

Adding this frequency is pretty simple,

```javascript
document.onkeydown = keyPress
function keyPress (e) {
  makeSound(e.keyCode)
}

function makeSound(keyCode){
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  var oscillator = audioCtx.createOscillator()
  oscillator.frequency.value =  ((25 * keyCode) - 1650) + 200
}
```

We just created an AudioContext, which is a place to hold and modify AudioNodes, and used it to create an OscillatorNode, which will play a waveform. The waveform itself will change depending on which button was called to create it. The code above doesn't make any noise yet, because we didn't tel the oscillator when to start or stop making noise, nor have we attached anything to the AudioContext's destination (your speakers or headphones).

Before we do that, we do want to be able to control the volume at which this sound plays. We first need to create a gainNode on the AudioContext to hold the volume parameter. We can do this with `AudioContext.createGain()`. However, we now reached the point where we want to combine the nodes and have them pass through one another. 

```javascript
document.onkeydown = keyPress
function keyPress (e) {
  makeSound(e.keyCode)
}

function makeSound(keyCode){
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  var oscillator = audioCtx.createOscillator()
  var gainNode = audioCtx.createGain()
   oscillator.frequency.value =  ((25 * keyCode) - 1650) + 200
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  gainNode.gain.value = 0.1
```

Using the `.connect` function in the nodes allow us to connect two nodes together to have the sound pass through them. The following code connects the oscillator to the gainNode, and the gainNode to your destination. This means the oscillator will generate sound, and all sound will have to pass through the gainNode, have the volume changed to `0.1` (10%), and *then* play in your sound device.

<img src="https://puu.sh/Bly2M/7f6623f3c6.jpg"/>

Up until now, we have been assuming that the `keyCode` variable passed to this function will be a number from  65 to 97, but that's only for the A-Z buttons on the keyboard. What if a user presses <kbd>SHIFT</kbd>, which is 16 or <kbd>&#x3E;</kbd>, which is 188? We don't want to play a note that is too low for humans to hear or play a note that is so high-pitched that it hurts to listen to. In order to fix this, we're just going to limit the frequency no matter which buttons are pressed.

```javascript
  var freq = ((32 * keyCode) - 2080) + 130
  oscillator.frequency.value = freq > 1046 ? 1046 : freq < 130 ? 130 : freq
```

<p data-height="500" data-theme-id="dark" data-slug-hash="WgxrNx" data-default-tab="js,result" data-user="berslucas" data-pen-title="WgxrNx" class="codepen">See the Pen <a href="https://codepen.io/berslucas/pen/WgxrNx/">WgxrNx</a> by Lucas Bersier (<a href="https://codepen.io/berslucas">@berslucas</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

----

Date: 2018-08-28