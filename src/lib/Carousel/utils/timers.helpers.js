export function debounce(func, ms = 0) {
  let timer = null;

  // eslint-disable-next-line func-names
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, ms);
  };
}
