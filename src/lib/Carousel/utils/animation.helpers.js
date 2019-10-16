// eslint-disable-next-line import/no-cycle
import * as Utils from './index';

export function animate(element, position = 0, durationMs = 0) {
  if (Utils.isElement(element)) {
    // eslint-disable-next-line no-param-reassign
    element.style.transition = `transform ${durationMs}ms ease-out`;
    // eslint-disable-next-line no-param-reassign
    element.style.transform = `translate3d(${position}px, 0, 0)`;
  }
  return element;
}

export function getTransformMatrix(element) {
  if (Utils.isElement(element)) {
    const { transform = '' } = getComputedStyle(element) || {};
    const matched = transform.match(/[0-9., -]+/) || [];
    if (typeof matched[0] === 'string') {
      return matched[0].split(',');
    }
  }
  return [];
}

export function getTranslateX(element) {
  const translateXIndex = 4;
  const matrix = getTransformMatrix(element);
  return matrix[translateXIndex] || '';
}

export const getTranslate3dPosition = (currentIndex = 0, state = {}) => {
  const { itemWidth, items, infinite, stagePadding = {} } = state;

  if (infinite) {
    const { paddingLeft, paddingRight } = stagePadding;
    if (paddingLeft || paddingRight) {
      // eslint-disable-next-line no-param-reassign
      currentIndex += 1;
    }
  }
  return (items + currentIndex) * -itemWidth || 0;
};

export const isAnimatedItem = (i = 0, animationProps = {}) => {
  const { allowFadeOutAnimation, fadeOutIndex } = animationProps;
  return !!allowFadeOutAnimation && fadeOutIndex === i;
};
