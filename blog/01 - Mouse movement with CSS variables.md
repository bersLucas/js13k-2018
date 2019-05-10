Custom CSS variables can be used to create custom properties that can then be passed on to a property.  This can be used for repeatable code and variabled which are subject to change as so

```css
root {
  --fonts 'Arial', sans-serif;
}

body {
  font-family var(--fonts);
}
```

We created a variable, `fonts` which was referenced later on in the `body` element. 

`root` is a pseudo-class to select the root element of your document. (Probably  `html`).

CSS variables are not declaring a static variable, but can be used to hold data that can be changed. I'm going to use this to create this mouse movement.
To start with the Javascript, we can use the mousemove event on my document to update the variable

```javascript
document.addEventListener('mousemove', function (e) {
  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});
````

I added an a href=httpsdeveloper.mozilla.orgen-USdocsWebAPIEventListener target=_blankEventListenera on every mousemove event and updating the root element's CSS properties. Here is a breakdown

  document The HTML document
  .documentElement The root element (`html`)
  .style The a href=httpsdeveloper.mozilla.orgen-USdocsWebAPIHTMLElementstyle target=_blankHTMLElement.stylea property of `html`
 .setProperty('--mouse-x', e.clientX + 'px'); set the property --mouse-x to the X mouse position.

In the CSS, I can reference these new properties like this

```css
with topleft
element {
 left var(--mouse-x);
 top var(--mouse-y);
 }
with transform
element {
  transform translate(var(--mouse-x),var(--mouse-y)
}
```

p data-height=500 data-theme-id=dark data-slug-hash=zLQvjp data-default-tab=js,result data-user=berslucas data-pen-title=zLQvjp class=codepenSee the Pen a href=httpscodepen.ioberslucaspenzLQvjpzLQvjpa by Lucas Bersier (a href=httpscodepen.ioberslucas@berslucasa) on a href=httpscodepen.ioCodePena.p
script async src=httpsstatic.codepen.ioassetsembedei.jsscript