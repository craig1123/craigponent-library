import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import CopyBox from './CopyBox';
import { Modal, Table } from '../../../lib';

const iconRow = {
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 10,
};

const headerTitles = ['Property', 'Type', 'Default Value'];

const lowerFirst = string =>
  string && string.charAt(0).toLowerCase() + string.slice(1);

class CopyIconsRow extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      icon: null,
      iconName: '',
      modalOpen: false,
    };
  }

  closeModal = () => {
    this.setState({ icon: '', modalOpen: false });
  };

  openModal = icon => () => {
    const iconName = icon.type.__filemeta.name || icon.type.name; // eslint-disable-line no-underscore-dangle, prettier/prettier

    this.setState({ icon, iconName, modalOpen: true });
  };

  renderModalContent = () => {
    const { icon, iconName } = this.state;
    if (icon) {
      const firstBox = `import ${iconName}SVG from 'craigponent-library/dist/icons/${lowerFirst(
        iconName,
      )}.svg';`;
      const iconProps = icon.type.defaultProps;
      return (
        <>
          <CopyBox copy={firstBox}>{firstBox}</CopyBox>
          <Row>
            {icon &&
              React.cloneElement(icon, {
                height: 75,
                width: 75,
                style: { marginTop: '15px' },
              })}
          </Row>
          {icon && (
            <div>
              <h4>Props:</h4>
              <Table fixedColumns striped styleMode="dark">
                <thead>
                  <tr>
                    {headerTitles.map(title => (
                      <th key={title}>{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(iconProps).map(prop => {
                    const val = iconProps[prop];
                    return (
                      <tr key={prop}>
                        <td>{prop}</td>
                        <td>{typeof val}</td>
                        <td>{String(val)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </>
      );
    }

    return 'Icon modal';
  };

  render() {
    const { iconName, modalOpen } = this.state;
    const mapChildren = React.Children.map(this.props.children, child => (
      <div
        style={iconRow}
        onClick={this.openModal(child)}
        onKeyPress={this.openModal(child)}
        role="button"
        tabIndex={0}
      >
        {React.cloneElement(child, {
          height: 26,
          width: 26,
        })}
        {child.type.__filemeta.name || child.type.name} {/* eslint-disable-line no-underscore-dangle, prettier/prettier */}
      </div>
    ));

    return (
      <Row>
        {mapChildren}
        <Modal
          header={iconName}
          isOpen={modalOpen}
          size="lg"
          styleMode="dark"
          toggle={this.closeModal}
        >
          {this.renderModalContent()}
        </Modal>
      </Row>
    );
  }
}

CopyIconsRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CopyIconsRow;
