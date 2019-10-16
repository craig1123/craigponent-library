/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import * as Utils from '../utils';

export const DotsNavigation = ({
  state,
  onClick,
  onMouseEnter,
  onMouseLeave,
  styleMode,
}) => {
  const { slides, items, infinite } = state;
  const { isNextSlideDisabled } = Utils.itemInfo(state);
  const dotsLength = Utils.getDotsNavigationLength(slides.length, items);
  const darkMode = styleMode === 'dark' ? 'dark' : '';
  return (
    <ul className="carousel__dots">
      {slides.map((item, i) => {
        if (i < dotsLength) {
          const isTheLastDotIndex = Utils.isTheLastDotIndex(
            i,
            infinite,
            dotsLength,
          );
          const itemIndex = Utils.getItemIndexForDotNavigation(
            i,
            isTheLastDotIndex,
            slides.length,
            items,
          );
          const activeIndex = Utils.getActiveSlideIndex(
            isNextSlideDisabled,
            state,
          );
          const isActive = activeIndex === i ? ' __active' : '';
          const className = `carousel__dots-item${isActive} ${darkMode}`;
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`dot-item-${i}`}
              onClick={() => onClick(itemIndex)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={className}
            />
          );
        }
      })}
    </ul>
  );
};

DotsNavigation.propTypes = {
  state: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  styleMode: PropTypes.string,
};

DotsNavigation.defaultProps = {
  styleMode: '',
};
