import canUseDOM from './canUseDOM';

function getOriginalBodyPadding() {
  let style = null;
  if (canUseDOM) {
    style = window.getComputedStyle(document.body, null);
  }

  return parseInt((style && style.getPropertyValue('padding-right')) || 0, 10);
}

export default getOriginalBodyPadding;
