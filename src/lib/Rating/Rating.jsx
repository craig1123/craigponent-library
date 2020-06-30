import React from 'react';
import PropTypes from 'prop-types';
import StarSVG from '../icons/star.svg';
import styles from './rating.module.scss';

const times = n => f =>
  Array(n)
    .fill()
    .map((_, i) => f(i));

const StarRating = ({
  average,
  interact,
  onClick,
  onHover,
  stars,
  width,
  ...rest
}) => {
  const starWidthPercentage = avg =>
    interact ? 100 : avg * (100 / stars) || 0;
  const getRating = i => stars - i;

  const handleClick = e => {
    let star = e.target;
    if (star.tagName === 'path') {
      star = star.parentNode.parentNode;
    }
    if (star.classList.contains('interact')) {
      onClick({ rating: getRating(star.dataset.index), star });
    }
  };

  const handleHover = e => {
    const star = e.target;
    if (star.classList.contains('interact')) {
      onHover({ rating: getRating(star.dataset.index), star });
    }
  };

  const renderStars = (params, fillColor) =>
    times(stars)(i => (
      <StarSVG
        key={i}
        data-index={i}
        fillColor={fillColor}
        className={
          params.className
            ? `${styles.star} ${params.className} ${styles[params.className]}`
            : styles.star
        }
        style={{
          width: `calc(${width}px / ${stars})`,
        }}
        {...params.events}
      />
    ));

  const interactEvents = {
    onClick: onClick && handleClick,
    onMouseEnter: onHover && handleHover,
  };

  return (
    <div
      className={styles.rating}
      title={`Review Average ${average}`}
      style={{ margin: `0 -${width * 0.02}px` }}
      {...rest}
    >
      <div style={{ width }}>
        <div className={styles.stars}>
          {renderStars(
            {
              className: interact && 'interact',
              events: interact && interactEvents,
            },
            '#bfbfbf',
          )}
        </div>
        <div
          className={styles.front}
          style={{ width: `${starWidthPercentage(average)}%` }}
        >
          <div className={styles.stars} style={{ width }}>
            {renderStars({
              className: interact && 'interact',
              events: interact && interactEvents,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  average: PropTypes.number,
  interact: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  stars: PropTypes.number,
  width: PropTypes.number,
};
StarRating.defaultProps = {
  average: 0,
  interact: false,
  onClick: null,
  onHover: null,
  stars: 5,
  width: 140,
};
export default StarRating;
