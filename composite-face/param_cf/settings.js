
// Mouse coordinates (x , y)
let x = 0;
let y = 0;
isDrawing = false;

// To avoid scroll down when press space bar
window.onkeydown = function(e) {
  return e.keyCode !== 32;
};

// disable scrolling page
function disableScroll() {
  // Get the current page scroll position
  scrollTop =
  window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft =
  window.pageXOffset || document.documentElement.scrollLeft,

  // if any scroll is attempted,
  // set this to the previous value
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

disableScroll();
