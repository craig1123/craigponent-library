import React from 'react';
import PropTypes from 'prop-types';
import styles from './table.module.scss';

const Table = props => {
  const {
    bordered,
    children,
    className,
    fixedColumns,
    hover,
    responsive,
    size,
    striped,
    styleMode,
    ...attributes
  } = props;

  const borderedClass = bordered ? styles['table-bordered'] : '';
  const hoverClass = hover ? styles['table-hover'] : '';
  const sizeClass = size === 'sm' ? styles['table-sm'] : '';
  const stripedClass = striped ? styles.striped : '';
  const fixedColumnsClass = fixedColumns ? styles['table-fixed'] : '';
  const darkMode = styleMode === 'dark' ? styles.dark : '';
  const classes = `${styles.table} ${borderedClass} ${fixedColumnsClass} ${darkMode} ${hoverClass} ${sizeClass} ${stripedClass} ${className}`.trim();

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
  bordered: PropTypes.bool,
  className: PropTypes.string,
  /** Each column is equal by default and is controlled byy colSpan */
  fixedColumns: PropTypes.bool,
  hover: PropTypes.bool,
  /** adds a horizontal scroll bar when the table starts cutting off content */
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['sm', '']),
  striped: PropTypes.bool,
  styleMode: PropTypes.string,
};

Table.defaultProps = {
  bordered: false,
  className: '',
  fixedColumns: false,
  hover: false,
  responsive: false,
  size: '',
  striped: false,
  styleMode: 'light',
};

export default Table;
