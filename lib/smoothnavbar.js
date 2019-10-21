'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hideonscroll;
function hideonscroll(selector) {

  var find = function find(selector, context) {
    return (context || document).querySelector(selector);
  };

  var wrap = function wrap(toWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    if (toWrap.nextSibling) {
      toWrap.parentNode.insertBefore(wrapper, toWrap.nextSibling);
    } else {
      toWrap.parentNode.appendChild(wrapper);
    }
    return wrapper.appendChild(toWrap);
  };

  var stylePLT = function stylePLT(target, position, left, top) {
    target.style.position = position;
    target.style.left = left + 'px';
    target.style.top = top + 'px';
  };

  var target = find(selector);
  var overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  overlay.style.position = 'absolute';
  overlay.style.left = 0;
  overlay.style.right = 0;
  overlay.style.top = 0;
  wrap(target, overlay);
  var offset = target.scrollHeight;

  var previousScroll = -1;
  var dir = 1; // up

  var calculations = function calculations() {
    if (window.pageYOffset > previousScroll) {
      // Action on scroll down
      if (overlay.scrollHeight > window.pageYOffset + offset) {
        overlay.style.height = window.pageYOffset + offset + 'px';
      }
    } else {
      // scroll up
      if (overlay.scrollHeight < window.pageYOffset) {
        overlay.style.height = window.pageYOffset + 'px';
      }
    }
    previousScroll = window.pageYOffset;
  };
  target.style.position = 'sticky';
  if (!target.style.position) {
    target.style.position = '-webkit-sticky';
  }

  var loop = function loop() {
    if (previousScroll === window.pageYOffset) {
      window.requestAnimationFrame(loop);
      return false;
    }
    calculations();
    window.requestAnimationFrame(loop);
  };
  loop();
}