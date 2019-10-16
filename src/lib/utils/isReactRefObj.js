function isReactRefObj(target) {
  if (target && typeof target === 'object') {
    return 'current' in target;
  }
  return false;
}

export default isReactRefObj;
