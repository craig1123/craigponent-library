import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './loading.module.scss';

class Loading extends PureComponent {
  colorStyle = {
    border: `1px solid ${this.props.color}`,
    borderColor: `${this.props.color} transparent transparent transparent`,
  };

  render() {
    const { color, ...rest } = this.props;
    return (
      <div className={styles['craig-loading-ring']} {...rest}>
        <div style={this.colorStyle} />
        <div style={this.colorStyle} />
        <div style={this.colorStyle} />
        <div style={this.colorStyle} />
      </div>
    );
  }
}

Loading.propTypes = {
  color: PropTypes.string,
};

Loading.defaultProps = {
  color: '#1F2228',
};

export default Loading;
