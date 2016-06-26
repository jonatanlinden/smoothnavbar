'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamic;
function dynamic(selector) {

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

  var calculations0 = function calculations0() {
    if (window.pageYOffset > previousScroll) {
      // Action on scroll down
      if (dir == 1 && target.offsetTop < window.pageYOffset - offset) {
        stylePLT(target, 'absolute', 0, window.pageYOffset);
        dir = 0;
      }
    } else {
      if (dir == 0 && target.offsetTop + offset < window.pageYOffset) {
        stylePLT(target, 'absolute', 0, window.pageYOffset - offset);
        dir = 1;
      } else if (target.offsetTop >= window.pageYOffset) {
        stylePLT(target, 'fixed', 0, 0);
        dir = 1;
      }
    }
    previousScroll = window.pageYOffset;
  };

  var calculations1 = function calculations1() {
    if (window.pageYOffset > previousScroll) {
      // Action on scroll down
      //      if
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
  var calculations = calculations0;
  if (Modernizr.csspositionsticky) {
    target.style.position = 'sticky';
    if (!target.style.position) {
      target.style.position = '-webkit-sticky';
    }
    calculations = calculations1;
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