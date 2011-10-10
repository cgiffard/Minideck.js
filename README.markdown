## Minideck.js

A simple slide deck with no dependancies (except you'll need an ES5 capable browser like Opera 11+, FireFox 4+, Safari 4+, or Chrome Whatever+.)

Minideck isn't intended to be a deck.js clone, but it solves a similar problem. It tries to separate style from behaviour, so you won't find ANY explicit CSS
in the `behaviour.js` file. You can write your own CSS, but an example template (based on my Web Directions South 2011 presentation) is included.

### So how do I make it work?

All you have to do is include the JS file, like so. There are no methods to call, no API, no funny business.

```html
<script src="behaviour.js" type="text/javascript"></script>
```

It looks for HTML5 `<section>` elements with a class of `slide`. They're ordered by the order in which they appear in the document.

There are two boolean attributes you may add to any element which sits within a slide:

* `order` - Tells minideck.js to include this element in the animation queue. A class of visible will be added to the element when it is reached.
* `autohide` - Tells minideck.js to 'hide' this element once the next element in the queue is displayed. This basically means a class of 'hidden' and another class of 'autohidden' are added to the element.

### Presenting with Minideck

Up and right cursor/arrow keys, as well as return and space advance the animation queue, moving to the next slide once the animation queue is drained.
The left and down cursor/arrow keys move back one slide, but they do not change the position in the per-slide animation queue.

The `g` key allows you to jump to a particular slide.

### Why?

Deck.js was too big. And I didn't want to include jQuery (so sue me.) And I've got a not-invented-here prejudice against jQuery plugins (so sue me.)

### Bugs & Roadmap

I'd like to switch the css classes to `.past`, `.current`/`.present`, and `.future` as I think it's a little more understandable and possibly a little more flexible.

Also there's some weirdness with `onhashchange`. I'll squash it soon.