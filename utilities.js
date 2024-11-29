function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

function $$(selector, parent) {
  return [...(parent || document).querySelectorAll(selector)];
}

/**
 *
 * @param fn
 * @param delay
 * @returns {(function(): void)|*}
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

function decreaseFontStep(selector, innerSelector, defaultFontSize) {
  let changed = false;
  $$(selector).forEach(el => {
    if (el.offsetWidth < el.scrollWidth) {
      changed = true;
      let first;

      if (innerSelector) {
        // get first only
        const elements = $$(innerSelector, el);
        elements.sort((a, b) => b.offsetWidth - a.offsetWidth);
        [first] = elements;
      } else {
        first = el;
      }
      const fontSize = parseInt(first.style.fontSize || defaultFontSize) - 1;
      // disable transitions for first element while changing font size
      first.classList.add("no-transition");
      first.style.fontSize = `${fontSize}px`;
      setTimeout(() => {
        first.classList.remove("no-transition");
      }, 1);
      if (fontSize < 2) {
        console.warn("Font size is too small", el);
        changed = false;
      }
    }
  });
  return changed;
}

function decreaseFont(selector, innerSelector, defaultFontSize) {
  let changed = false;
  let maxIterations = 30;
  do {
    changed = decreaseFontStep(selector, innerSelector, defaultFontSize);
    maxIterations--;
  } while (changed && maxIterations > 0);
}
