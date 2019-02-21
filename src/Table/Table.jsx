import React from 'react';
import PropTypes from 'prop-types';
import styles from './table.module.scss';

const Table = props => {
  const {
    bordered,
    children,
    className,
    hover,
    responsive,
    size,
    ...attributes
  } = props;

  const borderedClass = bordered ? styles['table-bordered'] : '';
  const hoverClass = hover ? styles['table-hover'] : '';
  const sizeClass = size === 'sm' ? styles['table-sm'] : '';
  const classes = `${
    styles.table
  } ${borderedClass} ${hoverClass} ${sizeClass} ${className}`.trim();

  const table = (
    <table {...attributes} className={classes}>
      {children}
    </table>
  );

  if (responsive) {
    return <div className={styles['table-responsive']}>{table}</div>;
  }

  return table;
};

Table.propTypes = {
  className: PropTypes.string,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['sm', '']),
};

Table.defaultProps = {
  bordered: false,
  className: '',
  hover: false,
  responsive: false,
  size: '',
};

export default Table;
