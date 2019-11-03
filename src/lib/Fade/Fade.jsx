import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const defaultStyle = duration => ({
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  willChange: 'transition',
});

const transitionStyles = opacity => ({
  entering: { opacity: 0 },
  entered: { opacity },
});

function Fade(props) {
  const {
    tag: Tag,
    innerRef,
    children,
    duration,
    in: show,
    mountOnEnter,
    unmountOnExit,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    opacity,
    ...rest
  } = props;

  return (
    <Transition
      timeout={duration}
      in={show}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      appear={appear}
      enter={enter}
      exit={exit}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {status => (
        <Tag
          ref={innerRef}
          style={{
            ...defaultStyle(duration),
            ...transitionStyles(opacity)[status],
          }}
          {...rest}
        >
          {children}
        </Tag>
      )}
    </Transition>
  );
}

Fade.propTypes = {
  /** Controls if the fade is currently showing or not (default: true) */
  in: PropTypes.bool.isRequired,

  /** All of these match react-transition-group/Transition props */
  addEndListener: PropTypes.func,
  appear: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  duration: PropTypes.number,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  mountOnEnter: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tag: PropTypes.string,
  unmountOnExit: PropTypes.bool,
};

Fade.defaultProps = {
  ...Transition.defaultProps,
  className: '',
  duration: 150,
  appear: true,
  enter: true,
  exit: true,
  in: true,
  innerRef: null,
  opacity: 1,
  tag: 'div',
};

export default Fade;
