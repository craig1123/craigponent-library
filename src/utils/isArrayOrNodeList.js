import canUseDOM from './canUseDOM';

function isArrayOrNodeList(els) {
  if (els === null) {
    return false;
  }
  return Array.isArray(els) || (canUseDOM && typeof els.length === 'number');
}

export default isArrayOrNodeList;
