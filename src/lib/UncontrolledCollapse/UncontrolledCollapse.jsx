import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from '../Collapse/Collapse';
import findDOMElements from '../utils/findDOMElements';
import addMultipleEventListeners from '../utils/addMultipleEventListeners';

class UncontrolledCollapse extends Component {
  constructor(props) {
    super(props);
    this.togglers = null;
    this.removeEventListeners = null;

    this.state = { isOpen: props.defaultOpen };
  }

  componentDidMount() {
    this.togglers = findDOMElements(this.props.toggler);
    if (this.togglers.length) {
      this.removeEventListeners = addMultipleEventListeners(
        this.togglers,
        this.toggle,
        this.props.toggleEvents,
      );
    }
  }

  componentWillUnmount() {
    if (this.togglers.length && this.removeEventListeners) {
      this.removeEventListeners();
    }
  }

  toggle = e => {
    e.preventDefault();
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { toggleEvents, defaultOpen, ...rest } = this.props;
    return <Collapse isOpen={this.state.isOpen} {...rest} />;
  }
}

UncontrolledCollapse.propTypes = {
  /** Has to match an "id" attribute on a different element */
  toggler: PropTypes.string.isRequired,
  defaultOpen: PropTypes.bool,
  toggleEvents: PropTypes.arrayOf(PropTypes.string),
};

UncontrolledCollapse.defaultProps = {
  defaultOpen: false,
  toggleEvents: ['touchstart', 'click'],
};

export default UncontrolledCollapse;
