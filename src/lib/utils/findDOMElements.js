import isReactRefObj from './isReactRefObj';
import canUseDOM from './canUseDOM';

function findDOMElements(target) {
  if (isReactRefObj(target)) {
    return target.current;
  }
  if (typeof target === 'function') {
    return target();
  }
  if (typeof target === 'string' && canUseDOM) {
    let selection = document.querySelectorAll(target);
    if (!selection.length) {
      selection = document.querySelectorAll(`#${target}`);
    }
    if (!selection.length) {
      throw new Error(
        `The target '${target}' could not be identified in the dom, tip: check spelling`,
      );
    }
    return selection;
  }
  return target;
}

export default findDOMElements;
