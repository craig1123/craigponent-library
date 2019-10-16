import React from 'react';
import { string, func, oneOfType, node, oneOf } from 'prop-types';
import Modal from '../Modal/Modal';
import LeftArrow from '../icons/leftArrow.svg';

import styles from './modalDrillDown.module.scss';

const ModalDrillDown = props => {
  const {
    bodyClassName,
    children,
    className,
    contentClassName,
    header,
    headerClassName,
    rightHeader,
    styleMode,
    toggle,
    ...rest
  } = props;
  const darkHeader = styleMode === 'dark' ? styles.dark : '';
  const drillDownHeaderClass = `${
    styles['modal-header']
  } ${darkHeader} ${headerClassName}`.trim();

  return (
    <Modal
      bodyClassName={`${styles['modal-body']} ${bodyClassName}`.trim()}
      className={`${styles['modal-dialog']} ${className}`.trim()}
      contentClassName={`${styles['modal-content']} ${contentClassName}`.trim()}
      styleMode={styleMode}
      toggle={toggle}
      xIcon={false}
      {...rest}
    >
      {header && (
        <div className={drillDownHeaderClass}>
          <button
            className={styles['modal-back-arrow-btn']}
            type="button"
            onClick={toggle}
          >
            <LeftArrow
              width={24}
              height={20}
              fillColor={styleMode === 'dark' ? '#fff' : '#2f3337'}
              style={{ verticalAlign: 'middle' }}
            />
          </button>
          <h5 className={styles['modal-title']}>{header}</h5>
          <div className={styles['empty-div']}>{rightHeader}</div>
        </div>
      )}
      <div className={styles['drill-down-body']}>{children}</div>
    </Modal>
  );
};

ModalDrillDown.propTypes = {
  children: node.isRequired,
  toggle: func.isRequired,
  bodyClassName: string,
  className: string,
  contentClassName: string,
  header: oneOfType([node, string]),
  headerClassName: string,
  /** Place some element in the right side of the header */
  rightHeader: oneOfType([node, string]),
  styleMode: oneOf(['dark', 'light']),
};

ModalDrillDown.defaultProps = {
  bodyClassName: '',
  className: '',
  contentClassName: '',
  header: null,
  headerClassName: '',
  rightHeader: null,
  styleMode: 'light',
};

export default ModalDrillDown;
