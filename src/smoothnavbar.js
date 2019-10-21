
export default function hideonscroll(selector) {

  let find = (selector, context) => {
    return (context || document).querySelector(selector);
  };

  let wrap = function (toWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    if (toWrap.nextSibling) {
      toWrap.parentNode.insertBefore(wrapper, toWrap.nextSibling);
    } else {
      toWrap.parentNode.appendChild(wrapper);
    }
    return wrapper.appendChild(toWrap);
  };

  let stylePLT = (target, position, left, top) => {
    target.style.position = position;
    target.style.left = left + 'px';
    target.style.top = top + 'px';
  }

  const target = find(selector);
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  overlay.style.position = 'absolute';
  overlay.style.left    = 0;
  overlay.style.right    = 0;
  overlay.style.top      = 0;
  wrap(target, overlay);
  const offset     = target.scrollHeight;

  let previousScroll = -1;
  let dir = 1; // up

  let calculations = () => {
    if (window.pageYOffset > previousScroll) {
      // Action on scroll down
      if (overlay.scrollHeight > window.pageYOffset + offset) {
        overlay.style.height = (window.pageYOffset + offset) + 'px';
      }
    } else {
      // scroll up
      if (overlay.scrollHeight < window.pageYOffset) {
        overlay.style.height = window.pageYOffset + 'px';
      }
    }
    previousScroll = window.pageYOffset;
  }
  target.style.position = 'sticky';
  if (!target.style.position) {
    target.style.position = '-webkit-sticky';
  }

  let loop = () => {
    if (previousScroll === window.pageYOffset) {
      window.requestAnimationFrame(loop);
      return false;
    }
    calculations();
    window.requestAnimationFrame(loop);
  }
  loop();
}
