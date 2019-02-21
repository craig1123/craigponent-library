import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import canUseDOM from '../utils/canUseDOM';

class Portal extends React.Component {
  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render() {
    if (!canUseDOM) {
      return this.props.children;
    }

    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode,
    );
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any, // eslint-disable-line
};

export default Portal;
