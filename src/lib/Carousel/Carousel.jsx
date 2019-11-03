/* NOTE: source is https://github.com/maxmarinich/react-alice-carousel */

/* eslint-disable react/sort-comp */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

import * as Utils from './utils';
import * as Views from './views';

import styles from './carousel.module.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clones: [],
      stagePadding: {},
      currentIndex: 1,
      initialStageHeight: 0,
      duration: props.duration,
      slides: Utils.getSlides(props),
      style: Utils.getDefaultStyles(),
    };

    this.touchEventsCallstack = [];
    this.slideTo = this.slideTo.bind(this);
    this.slidePrev = this.slidePrev.bind(this);
    this.slideNext = this.slideNext.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.debounceHandleOnWIndowResize = Utils.debounce(
      this.handleOnWindowResize,
      100,
    );
  }

  componentDidMount() {
    this.setInitialState();
    this.resetAllIntermediateProps();
    this.rootComponentDimensions = Utils.getElementDimensions(
      this.rootComponent,
    );

    window.addEventListener('resize', this.debounceHandleOnWIndowResize);

    if (!this.props.keysControlDisabled) {
      window.addEventListener('keyup', this.handleOnKeyUp);
    }

    this.debounceHandleOnWIndowResize();

    this.props.autoPlay && this.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.setState(
        Utils.calculateInitialProps(this.props, this.stageComponent),
      );
    }

    if (
      this.props.autoHeight &&
      this.stageComponent &&
      !this.state.initialStageHeight
    ) {
      const initialStageHeight = Utils.getGalleryItemHeight(
        this.stageComponent,
        this.props,
        this.state,
      );
      this.setState({ initialStageHeight });
    }

    if (this.props.duration !== prevProps.duration) {
      this.setState({ duration: this.props.duration });
    }

    if (this.props.fadeOutAnimation !== prevProps.fadeOutAnimation) {
      this.setState(
        { fadeoutAnimationProcessing: false },
        this.resetAnimationProps,
      );
    }

    if (this.props.slideToIndex !== prevProps.slideToIndex) {
      this.onSlideToIndexChange(
        this.state.currentIndex,
        this.props.slideToIndex,
      );
    }

    if (
      this.props.disableAutoPlayOnAction !==
        prevProps.disableAutoPlayOnAction ||
      this.props.autoPlayDirection !== prevProps.autoPlayDirection ||
      this.props.autoPlayInterval !== prevProps.autoPlayInterval ||
      this.props.infinite !== prevProps.infinite ||
      this.props.autoPlay !== prevProps.autoPlay
    ) {
      this.props.autoPlay ? this.play() : this.pause();
    }

    if (
      this.props.stagePadding !== prevProps.stagePadding ||
      this.props.responsive !== prevProps.responsive ||
      this.props.infinite !== prevProps.infinite ||
      this.props.items !== prevProps.items
    ) {
      this.resetAllIntermediateProps();
      this.setState(
        Utils.calculateInitialProps(this.props, this.stageComponent),
      );
    }

    if (this.props.keysControlDisabled !== prevProps.keysControlDisabled) {
      this.props.keysControlDisabled
        ? window.removeEventListener('keyup', this.handleOnKeyUp)
        : window.addEventListener('keyup', this.handleOnKeyUp);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceHandleOnWIndowResize);

    if (!this.props.keysControlDisabled) {
      window.removeEventListener('keyup', this.handleOnKeyUp);
    }

    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }
  }

  onSlideToIndexChange = (currentIndex, slideToIndex) => {
    if (slideToIndex === currentIndex + 1) {
      this.slideNext();
    } else if (slideToIndex === currentIndex - 1) {
      this.slidePrev();
    } else {
      this.slideTo(slideToIndex);
    }
  };

  onInactiveItem = () => {
    this.onSlideChange();
    this.onSlideChanged();
    this.allowAnimation = true;
    this.pause();
  };

  onSlideChange() {
    if (this.props.onSlideChange) {
      this.props.onSlideChange(this.getEventObject());
    }
  }

  onSlideChanged() {
    if (this.props.onSlideChanged) {
      this.props.onSlideChanged(this.getEventObject());
    }
    this.allowAnimation = true;
  }

  slideTo(index = 0) {
    if (this.isClickDisabled(index)) return;

    this.allowAnimation = false;
    this.isFadeOutAnimationAllowed() && this.setAnimationPropsOnDotClick(index);
    this.props.disableAutoPlayOnAction && this.pause();
    this.slideToItem(index);
  }

  slidePrev(action = true) {
    if (this.isClickDisabled()) return;

    this.allowAnimation = false;
    this.isFadeOutAnimationAllowed() && this.setAnimationPropsOnClick('prev');

    if (Utils.itemInfo(this.state).isPrevSlideDisabled)
      return this.onInactiveItem();
    if (action && this.props.disableAutoPlayOnAction) this.pause();

    this.slideToItem(this.state.currentIndex - 1);
  }

  slideNext(action = true) {
    if (this.isClickDisabled()) return;

    this.allowAnimation = false;
    this.isFadeOutAnimationAllowed() && this.setAnimationPropsOnClick('next');

    if (Utils.itemInfo(this.state).isNextSlideDisabled)
      return this.onInactiveItem();
    if (action && this.props.disableAutoPlayOnAction) this.pause();

    this.slideToItem(this.state.currentIndex + 1);
  }

  onInitialized(initialState) {
    if (this.props.onInitialized) {
      this.props.onInitialized(this.getEventObject(initialState));
    }
  }

  onResized() {
    if (this.props.onResized) {
      this.props.onResized(this.getEventObject());
    }
  }

  setInitialState() {
    const initialState = Utils.calculateInitialProps(
      this.props,
      this.stageComponent,
    );
    this.setState(initialState, this.onInitialized(initialState));
  }

  setRootComponentRef = node => (this.rootComponent = node);

  setStageComponentRef = node => (this.stageComponent = node);

  checkSlidePosition(shouldSkipRecalculation) {
    this.stopSwipeAnimation();
    this.resetAnimationProps();
    this.resetSwipePositionProps();

    shouldSkipRecalculation
      ? this.skipSlidePositionRecalculation()
      : this.updateSlidePosition();
  }

  skipSlidePositionRecalculation = () => {
    if (this.isFadeOutAnimationAllowed()) {
      return this.resetFadeOutAnimationState();
    }

    this.onSlideChanged();
    this.props.disableAutoPlayOnAction && this.pause();
    this.isHovered = false;
  };

  updateSlidePosition = () => {
    this.updateSlidePositionIntervalId = setTimeout(() => {
      if (this.shouldRecalculatePosition()) {
        this.recalculateSlidePosition();
      } else if (this.isFadeOutAnimationAllowed()) {
        this.resetFadeOutAnimationState();
      } else {
        this.onSlideChanged();
      }
    }, this.state.duration);
  };

  resetFadeOutAnimationState = () => {
    this.setState({ fadeoutAnimationProcessing: false }, this.onSlideChanged);
  };

  resetAllIntermediateProps = () => {
    this.swipingStarted = false;
    this.verticalSwipingDetected = false;

    this.stopSwipeAnimation();
    this.resetAnimationProps();
    this.resetSwipePositionProps();
    this.clearUpdateSlidePositionIntervalId();
    this.resetTranslateAnimationProcessingFlag();
    this.allowAnimation = true;
  };

  recalculateSlidePosition = () => {
    const style = Utils.getDefaultStyles();
    const currentIndex = Utils.recalculateCurrentSlideIndex(this.state);
    const translate3d = Utils.recalculateTranslatePosition(this.state);

    this.setState(
      {
        currentIndex,
        translate3d,
        style,
        ...this.getFadeOutAnimationState(),
      },
      () => this.onSlideChanged(),
    );
  };

  getEventObject = (state = this.state) => {
    const { items: itemsInSlide, currentIndex: item } = state;
    const { isNextSlideDisabled } = Utils.itemInfo(state);
    const slide = Utils.getActiveSlideIndex(isNextSlideDisabled, state);

    return { item, slide, itemsInSlide };
  };

  setAnimationPropsOnDotClick = itemIndex => {
    const { currentIndex, itemWidth } = this.state;
    const fadeOutIndex = currentIndex + 1;
    const fadeOutOffset = Utils.getFadeOutOffsetOnDotClick(
      itemIndex,
      currentIndex,
      itemWidth,
    );

    this.setAnimationProps({
      fadeOutIndex,
      fadeOutOffset,
      allowFadeOutAnimation: true,
    });
  };

  setAutoPlayInterval() {
    const { duration } = this.state;
    const { autoPlayDirection, autoPlayInterval } = this.props;
    const playInterval = Math.max(autoPlayInterval, duration);
    this.autoPlayIntervalId = setInterval(() => {
      if (!this.isHovered && this.autoPlayIntervalId && this.state.isPlaying) {
        autoPlayDirection === 'rtl'
          ? this.slidePrev(false)
          : this.slideNext(false);
      }
    }, playInterval);
  }

  clearAutoPlayInterval() {
    clearInterval(this.autoPlayIntervalId);
    this.autoPlayIntervalId = null;
  }

  handleOnSpaceBarClick = () => {
    this.props.autoPlay && this.playPauseToggle();
  };

  handleOnMouseEnter = () => {
    if (this.props.stopAutoPlayOnHover) {
      this.isHovered = true;
    }
  };

  handleOnMouseLeave = () => {
    this.isHovered = false;
  };

  handleOnKeyUp = e => {
    switch (e.code) {
      case 'Space':
        return this.handleOnSpaceBarClick();
      case 'ArrowLeft':
        return this.slidePrev();
      case 'ArrowRight':
        return this.slideNext();
      default:
        break;
    }
  };

  handleOnAnimationCanceled = () => {
    this.resetAllIntermediateProps();
    this.setState({ isAnimationCanceled: false });
  };

  clearUpdateSlidePositionIntervalId() {
    clearInterval(this.updateSlidePositionIntervalId);
  }

  play() {
    this.setState({ isPlaying: true });
    if (!this.autoPlayIntervalId) {
      this.setAutoPlayInterval();
    }
  }

  pause = () => {
    if (this.autoPlayIntervalId) {
      this.clearAutoPlayInterval();
      this.setState({ isPlaying: false });
    }
  };

  playPauseToggle = () => {
    if (!this.allowAnimation) return;
    this.state.isPlaying ? this.pause() : this.play();
  };

  getIntermediateStateProps = (duration, shouldSkipRecalculation) => {
    const condition =
      !shouldSkipRecalculation && this.isFadeOutAnimationAllowed();
    return Utils.getIntermediateTransitionProps(condition, duration);
  };

  slideToItem(index, options = {}) {
    this.onSlideChange();
    const {
      duration = this.state.duration,
      shouldSkipRecalculation = false,
    } = options;
    const translate3d = Utils.getTranslate3dPosition(index, this.state);
    this.setState(
      {
        currentIndex: index,
        translate3d,
        ...this.getIntermediateStateProps(duration, shouldSkipRecalculation),
      },
      () => this.checkSlidePosition(shouldSkipRecalculation),
    );
  }

  addTouchEventToCallstack = () => {
    this.touchEventsCallstack.push(1);
  };

  removeTouchEventFromCallstack = () => {
    this.touchEventsCallstack.pop();
  };

  setTranslateAnimationProcessingFlag = () => {
    this.translateAnimationProcessing = true;
  };

  resetTranslateAnimationProcessingFlag = () => {
    this.translateAnimationProcessing = false;
  };

  startSwipeAnimation = () => {
    this.swipeAnimation = true;
  };

  stopSwipeAnimation = () => {
    this.swipeAnimation = false;
  };

  setAnimationProps = newProps => {
    const prevProps = this.animationProps || {};
    this.animationProps = { ...prevProps, ...newProps };
  };

  resetAnimationProps = () => {
    this.animationProps = {};
  };

  setSwipePositionProps = newProps => {
    const prevProps = this.swipePosition || {};
    this.swipePosition = { ...prevProps, ...newProps };
  };

  resetSwipePositionProps = () => {
    this.swipePosition = {};
  };

  getTranslateXPosition = deltaX => {
    const { translate3d } = this.state;
    const { startPosition = translate3d } = this.swipePosition;

    if (
      !!this.touchEventsCallstack.length &&
      this.translateAnimationProcessing
    ) {
      this.resetTranslateAnimationProcessingFlag();
      const lastTranslateXPosition = Utils.getTranslateX(this.stageComponent);

      if (lastTranslateXPosition) {
        return lastTranslateXPosition - deltaX;
      }
    }
    return startPosition - deltaX;
  };

  onTouchMove(e, deltaX, deltaY) {
    this.swipingStarted = true;
    this.handleOnMouseEnter();

    if (Utils.isVerticalTouchMoveDetected(e, deltaX, deltaY)) {
      this.verticalSwipingDetected = true;
      return;
    }
    this.verticalSwipingDetected = false;

    if (this.isSwipeDisable()) {
      return;
    }

    this.allowAnimation = false;
    this.startSwipeAnimation();
    this.clearUpdateSlidePositionIntervalId();

    const { slides, items, itemWidth, infinite, stagePadding } = this.state;
    const slidesLength = slides.length;
    const direction = Utils.getSwipeDirection(deltaX);
    let position = this.getTranslateXPosition(deltaX);

    if (infinite === false) {
      const minSwipeLimit = Utils.getMinSwipeLimitIfNotInfinite(
        items,
        itemWidth,
      );
      const maxSwipeLimit = Utils.getMaxSwipeLimitIfNotInfinite(
        slidesLength,
        itemWidth,
      );

      if (
        Utils.shouldRecalculateSwipePosition(
          position,
          minSwipeLimit,
          maxSwipeLimit,
        )
      ) {
        return;
      }

      Utils.animate(this.stageComponent, position);
      this.setSwipePositionProps({ position, direction });
      return;
    }

    const maxPosition = Utils.getMaxSwipePosition(
      items,
      itemWidth,
      slidesLength,
    );
    const minPosition = Utils.getMinSwipePosition(items, itemWidth);
    const maxSwipeLimit = Utils.getMaxSwipeLimit(maxPosition, stagePadding);
    const minSwipeLimit = Utils.getMinSwipeLimit(minPosition, stagePadding);

    function recalculatePosition() {
      direction === 'RIGHT'
        ? (position += slidesLength * -itemWidth)
        : (position = position + maxPosition - items * itemWidth);

      if (
        Utils.shouldRecalculateSwipePosition(
          position,
          minSwipeLimit,
          maxSwipeLimit,
        )
      ) {
        recalculatePosition();
      }
    }

    if (
      Utils.shouldRecalculateSwipePosition(
        position,
        minSwipeLimit,
        maxSwipeLimit,
      )
    ) {
      try {
        recalculatePosition();
      } catch (err) {
        // Utils.debug(err);
      }
    }

    Utils.animate(this.stageComponent, position);
    this.setSwipePositionProps({ position, direction });
  }

  getFadeOutAnimationState = shouldRecalculate => {
    if (shouldRecalculate || this.isFadeOutAnimationAllowed()) {
      return { fadeoutAnimationProcessing: false };
    }
    return {};
  };

  handleOnWindowResize = e => {
    const { shouldHandleResizeEvent } = this.props;
    const currentDimensions = Utils.getElementDimensions(this.rootComponent);
    const shouldProcessEvent =
      shouldHandleResizeEvent || Utils.shouldHandleResizeEvent;

    if (
      shouldProcessEvent(e, this.rootComponentDimensions, currentDimensions)
    ) {
      this.rootComponentDimensions = currentDimensions;
      this.allowAnimation = false;
      this.handleOnMouseEnter();

      const isAnimationCanceled = this.isSwipeAnimationProcessing();
      const currState = Utils.calculateInitialProps(
        this.props,
        this.stageComponent,
      );
      const translate3d = Utils.getTranslate3dPosition(
        currState.currentIndex,
        currState,
      );
      const nextState = {
        ...currState,
        translate3d,
        isAnimationCanceled,
        initialStageHeight: 0,
      };

      if (isAnimationCanceled) Utils.animate(this.stageComponent, translate3d);

      this.setState(nextState, () => {
        this.resetAllIntermediateProps();
        this.handleOnMouseLeave();
        this.onResized();
      });
    }
  };

  onTouchEnd = () => {
    this.swipingStarted = false;

    if (this.isSwipeDisable()) {
      return;
    }

    this.addTouchEventToCallstack();
    this.setSwipePositionProps({ startPosition: this.swipePosition.position });
    this.beforeTouchEnd();
  };

  beforeTouchEnd() {
    const { direction, position } = this.swipePosition;
    const { itemWidth, items, duration, infinite } = this.state;
    const swipeIndex = Utils.calculateSwipeIndex(
      itemWidth,
      position,
      direction,
    );
    const currentIndex = Utils.getSwipeIndexOnBeforeTouchEnd(swipeIndex, items);
    const translateXPosition = Utils.getSwipePositionOnBeforeTouchEnd(
      swipeIndex,
      itemWidth,
    );

    if (infinite === false) {
      this.isInfiniteModeDisabledBeforeTouchEnd(swipeIndex, currentIndex);
      return;
    }

    this.setTranslateAnimationProcessingFlag();
    Utils.animate(this.stageComponent, translateXPosition, duration);

    setTimeout(() => {
      this.removeTouchEventFromCallstack();
      this.resetTranslateAnimationProcessingFlag();

      if (this.isSwipeAnimationLastFrame()) {
        if (this.state.isAnimationCanceled) {
          return this.handleOnAnimationCanceled();
        }

        const nextItemIndex = Utils.getNextItemIndexBeforeTouchEnd(
          translateXPosition,
          this.state,
        );
        const nextTranslateXPosition = Utils.getTranslate3dPosition(
          nextItemIndex,
          this.state,
        );

        Utils.animate(this.stageComponent, nextTranslateXPosition, 0);
        this.slideToItem(nextItemIndex, {
          duration: 0,
          shouldSkipRecalculation: true,
        });
      }
    }, duration);
  }

  isInfiniteModeDisabledBeforeTouchEnd(swipeIndex, currentIndex) {
    const { items, itemWidth, duration, slides } = this.state;
    let position = Utils.getTranslate3dPosition(currentIndex, {
      itemWidth,
      items,
    });

    if (swipeIndex < items) {
      currentIndex = Utils.recalculateCurrentIndexOnBeforeTouchEnd();
      position = Utils.recalculatePositionOnBeforeTouchEnd(items, itemWidth);
    }

    if (swipeIndex > slides.length) {
      currentIndex = Utils.recalculateCurrentIndexOnBeforeTouchEnd(
        slides.length,
        items,
      );
      position = Utils.recalculatePositionOnBeforeTouchEnd(
        slides.length,
        itemWidth,
      );
    }

    Utils.animate(this.stageComponent, position, duration);
    this.setTranslateAnimationProcessingFlag();

    setTimeout(() => {
      this.removeTouchEventFromCallstack();
      this.resetTranslateAnimationProcessingFlag();

      if (this.isSwipeAnimationLastFrame()) {
        if (this.state.isAnimationCanceled) {
          return this.handleOnAnimationCanceled();
        }

        Utils.animate(this.stageComponent, position);
        this.slideToItem(currentIndex, {
          duration: 0,
          shouldSkipRecalculation: true,
        });
      }
    }, duration);
  }

  isClickDisabled = itemIndex => {
    const { currentIndex, isAnimationCanceled } = this.state;
    return (
      currentIndex === itemIndex ||
      isAnimationCanceled ||
      !this.allowAnimation ||
      this.swipeAnimation
    );
  };

  isFadeOutAnimationAllowed = () => {
    const { stagePadding, items } = this.state;
    const hasNoStagePadding = !(
      stagePadding.paddingLeft || stagePadding.paddingRight
    );

    return this.props.fadeOutAnimation && items === 1 && hasNoStagePadding;
  };

  isSwipeDisable = () => {
    const { isAnimationCanceled, fadeOutAnimation } = this.state;
    return (
      this.props.swipeDisabled ||
      fadeOutAnimation ||
      isAnimationCanceled ||
      this.verticalSwipingDetected
    );
  };

  isSwipeAnimationLastFrame = () =>
    !this.swipingStarted && this.touchEventsCallstack.length === 0;

  isSwipeAnimationProcessing = () => !!this.touchEventsCallstack.length;

  shouldRecalculatePosition = () => {
    const { slides, currentIndex } = this.state;
    return currentIndex < 0 || currentIndex >= slides.length;
  };

  setAnimationPropsOnClick = direction => {
    const { currentIndex, itemWidth } = this.state;
    const fadeOutIndex = Utils.getFadeOutIndexOnClick(currentIndex);
    const fadeOutOffset = Utils.getFadeOutOffsetOnClick(direction, itemWidth);

    this.setAnimationProps({
      fadeOutIndex,
      fadeOutOffset,
      allowFadeOutAnimation: true,
    });
  };

  renderPrevButton() {
    const { isPrevSlideDisabled } = Utils.itemInfo(this.state);
    return (
      <Views.PrevNextButton
        name="prev"
        disabled={isPrevSlideDisabled}
        onClick={this.slidePrev}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        styleMode={this.props.styleMode}
        buttonPosition={this.props.buttonPosition}
      />
    );
  }

  renderNextButton() {
    const { isNextSlideDisabled } = Utils.itemInfo(this.state);
    return (
      <Views.PrevNextButton
        name="next"
        disabled={isNextSlideDisabled}
        onClick={this.slideNext}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        styleMode={this.props.styleMode}
        buttonPosition={this.props.buttonPosition}
      />
    );
  }

  renderStageItem = (item, i) => {
    const style = Utils.itemStyles(i, this.state, this.animationProps);
    const className = Utils.itemClassName(i, this.state, this.animationProps);
    return (
      <Views.StageItem
        styles={style}
        className={className}
        key={`stage-item-${i}`}
        item={item}
      />
    );
  };

  renderDotsNavigation() {
    return (
      <Views.DotsNavigation
        state={this.state}
        onClick={this.slideTo}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        styleMode={this.props.styleMode}
      />
    );
  }

  render() {
    const {
      items,
      styleMode,
      arrowPosition,
      swipeClassName,
      ...rest
    } = this.props;
    const { style, translate3d, clones } = this.state;
    const wrapperStyles = Utils.getWrapperStyles(
      this.stageComponent,
      this.props,
      this.state,
    );
    const stageStyles = Utils.getStageStyles({ translate3d }, style);
    const darkMode = styleMode === 'dark' ? styles.dark : '';
    const arrowPositionClass = arrowPosition === 'middle' ? styles.middle : '';

    return (
      <div
        className={`${styles.carousel} ${darkMode} ${arrowPositionClass}`}
        ref={this.setRootComponentRef}
      >
        <Swipeable
          rotationAngle={3}
          stopPropagation
          onSwiping={this.onTouchMove}
          onSwiped={this.onTouchEnd}
          trackMouse={this.props.mouseDragEnabled}
          preventDefaultTouchmoveEvent={this.props.preventEventOnTouchMove}
          className={`${arrowPositionClass !== '' &&
            styles['carousel-swipeable']} ${swipeClassName}`}
          {...rest}
        >
          <div
            style={wrapperStyles}
            className={`${styles['carousel-wrapper']} ${arrowPositionClass}`}
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
          >
            <ul
              style={stageStyles}
              className={styles['carousel-stage']}
              ref={this.setStageComponentRef}
            >
              {React.Children.map(clones, this.renderStageItem)}
            </ul>
          </div>
        </Swipeable>
        {!this.props.dotsDisabled ? this.renderDotsNavigation() : null}
        {!this.props.buttonsDisabled ? this.renderPrevButton() : null}
        {!this.props.buttonsDisabled ? this.renderNextButton() : null}
      </div>
    );
  }
}

Carousel.propTypes = {
  arrowPosition: PropTypes.string,
  autoHeight: PropTypes.bool,
  /** Automatically starts the carousel without pressing any arrow */
  autoPlay: PropTypes.bool,
  autoPlayDirection: PropTypes.string,
  autoPlayInterval: PropTypes.number,
  buttonPosition: PropTypes.string,
  buttonsDisabled: PropTypes.bool,
  children: PropTypes.array,
  disableAutoPlayOnAction: PropTypes.bool,
  dotsDisabled: PropTypes.bool,
  duration: PropTypes.number,
  /** If true, the slides will fade out as they exit */
  fadeOutAnimation: PropTypes.bool,
  /** After a slide is done, it will be appended to the end of the slides to show up again */
  infinite: PropTypes.bool,
  items: PropTypes.array,
  keysControlDisabled: PropTypes.bool,
  /** If true, the slides can be swiped or dragged with a mouse */
  mouseDragEnabled: PropTypes.bool,
  onInitialized: PropTypes.func,
  onResized: PropTypes.func,
  onSlideChange: PropTypes.func,
  onSlideChanged: PropTypes.func,
  preventEventOnTouchMove: PropTypes.bool,
  responsive: PropTypes.object,
  shouldHandleResizeEvent: PropTypes.func,
  slideToIndex: PropTypes.number,
  stagePadding: PropTypes.object,
  startIndex: PropTypes.number,
  stopAutoPlayOnHover: PropTypes.bool,
  styleMode: PropTypes.string,
  swipeClassName: PropTypes.string,
  swipeDisabled: PropTypes.string,
};

Carousel.defaultProps = {
  autoHeight: false,
  autoPlay: false,
  autoPlayDirection: 'ltr',
  autoPlayInterval: 2500,
  buttonsDisabled: false,
  children: [],
  disableAutoPlayOnAction: false,
  dotsDisabled: true,
  duration: 600,
  fadeOutAnimation: false,
  infinite: true,
  items: [],
  keysControlDisabled: false,
  mouseDragEnabled: true,
  onInitialized: null,
  onResized: null,
  onSlideChange: null,
  onSlideChanged: null,
  preventEventOnTouchMove: false,
  responsive: {},
  shouldHandleResizeEvent: null,
  slideToIndex: 0,
  stagePadding: {},
  startIndex: 0,
  stopAutoPlayOnHover: true,
  styleMode: '',
  swipeDisabled: false,
  arrowPosition: '',
  buttonPosition: '',
  swipeClassName: '',
};

export default Carousel;
