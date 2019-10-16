import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Copy, CheckMark } from '../../../lib/icons';

const copyBox = {
  backgroundColor: '#545658',
  border: '1px solid #626669',
  borderRadius: '3px',
  cursor: 'pointer',
  margin: '15px 0',
  padding: 15,
};

const floatRight = {
  float: 'right',
};

class CopyBox extends Component {
  constructor(props) {
    super(props);

    this.state = { copySuccess: false };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleCopy = () => {
    if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.props.copy);
      this.setState({ copySuccess: true });

      this.timer = setTimeout(() => {
        this.setState({ copySuccess: false });
      }, 1000);
    }
  };

  render() {
    const { copySuccess } = this.state;
    return (
      <div
        style={copyBox}
        onClick={this.handleCopy}
        onKeyPress={this.openModal}
        role="button"
        tabIndex={0}
      >
        {this.props.children}
        <div style={floatRight}>
          {copySuccess ? (
            <CheckMark fillColor="#00CE7D" height={24} width={24} />
          ) : (
            <Copy fillColor="#fff" />
          )}
        </div>
      </div>
    );
  }
}

CopyBox.propTypes = {
  children: PropTypes.node.isRequired,
  copy: PropTypes.string.isRequired,
};

export default CopyBox;
