<a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API" target="_blank">Pointer Lock API</a> gives a browser access to the delta movement. It also lets you capture movement that would normally be off-screen if you use a **`mouseMove`** event.

When should you use Pointer Lock API?

* If your app's user will likely move the mouse off the screen.
* If you want to capture delta movement instead of cursor's position.
* When capturing mouse movement in a 3d space.

What are the main differences between Pointer Lock and just using `mouseMove` events?

* A user can't move their mouse off the screen.
* A user record movement that would normally go past a screen's boundaries.
* Cursor is hidden (No more need for **`pointer: none`**)!

**`requestPointerLock`** is a function added to every DOM element. It's only available if the document is focused, so a good practice would be to enable it on a click event like this:

```javascript
document.addEventListener('click', (e) => {
  document.body.requestPointerLock()
})
```

The above code waits for a user to click on the document, then requests a pointer lock on the **`<body>`** element. We now have access to **`document.pointerLockElement`**, which will be the element that triggered the lock (`<body>`).

We also have access to ** `document.exitPointerLock()`** which will exit the Pointer Lock. (A user could also press the <kbd>esc</kbd> key to do this.

Now we can add an eventListener to listen for mouse movements. You might be used to using **`screenX/Y`** or **`clientX/Y`**, but since we enabled the Pointer Lock, we use **`movementX/Y`** instead. (clientX/Y and screenX/Y will not update and stay at the same position until we unlock the pointer).

<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX" target="_blank">movementX/Y</a> will tell us the mouse's movement since the last event. If you ever used delta time (dt) in gaming engines, it's similar, but with mouse movement instead of time. Here is the full demo:

<p data-height="500" data-theme-id="dark" data-slug-hash="VBJwyd" data-default-tab="js,result" data-user="berslucas" data-pen-title="VBJwyd" class="codepen">See the Pen <a href="https://codepen.io/berslucas/pen/VBJwyd/">VBJwyd</a> by Lucas Bersier (<a href="https://codepen.io/berslucas">@berslucas</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

In the above code, we also use the **`pointerlockchange`** event. This event is fired when the pointer is locked or unlocked.  We do this so we can wait for the cursor to be successfully locked before we try to access the `movementX/Y` variables.

Here is a step-by-step of the above code:

* Wait for the user to click on the document
* Run requestPointerLock() on the `<body>`
* If requestPointerLock() is successful, it will trigger the `pointerlockchange` event.
* If the pointerLockElement is `<body>`, it will an en event listener on mousemove events
* These mousemove events will have movementX/Y, which I can use in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" target="_blank">requestAnimationFrame</a> to update the mouse position.

----

Date: 2018-08-16