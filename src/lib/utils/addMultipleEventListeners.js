import isArrayOrNodeList from './isArrayOrNodeList';

function addMultipleEventListeners(_els, handler, _events, useCapture) {
  let els = _els;
  if (!isArrayOrNodeList(els)) {
    els = [els];
  }

  let events = _events;
  if (typeof events === 'string') {
    events = events.split(/\s+/);
  }

  if (
    !isArrayOrNodeList(els) ||
    typeof handler !== 'function' ||
    !Array.isArray(events)
  ) {
    throw new Error(`
      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.
      The second must be a function.
      The third is a string or an array of strings that represents DOM events
    `);
  }

  Array.prototype.forEach.call(events, event => {
    Array.prototype.forEach.call(els, el => {
      el.addEventListener(event, handler, useCapture);
    });
  });
  return function removeEvents() {
    Array.prototype.forEach.call(events, event => {
      Array.prototype.forEach.call(els, el => {
        el.removeEventListener(event, handler, useCapture);
      });
    });
  };
}
export default addMultipleEventListeners;
