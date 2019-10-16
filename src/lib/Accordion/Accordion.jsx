import React, { useState, useEffect } from 'react';
import { string, node, bool, oneOfType, func } from 'prop-types';
import Collapse from '../Collapse/Collapse';
import DownCaret from '../icons/downCaret.svg';
import UpCaret from '../icons/upCaret.svg';

import styles from './accordion.module.scss';

const Accordion = ({
  children,
  className,
  description,
  onClick,
  open,
  styleMode,
  title,
  ...rest
}) => {
  const [openAccordion, setAccordion] = useState(open);

  useEffect(() => {
    if (open !== openAccordion) {
      setAccordion(open);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const setOpen = () => {
    const newAccordion = !openAccordion;

    if (onClick) {
      onClick(newAccordion);
    }

    setAccordion(newAccordion);
  };

  const wrapperOpen = openAccordion ? styles['wrapper-open'] : '';
  const darkMode = styleMode === 'dark';
  const darkModeClass = darkMode ? styles.dark : '';
  const fillColor = darkMode ? '#fff' : '#2F3337';

  return (
    <div
      aria-expanded={openAccordion ? 'true' : 'false'}
      aria-labelledby="accordion"
      className={`${
        styles['accordion-wrapper']
      } ${darkModeClass} ${wrapperOpen} ${className}`.trim()}
      {...rest}
    >
      <div
        className={styles['accordion-header']}
        onClick={setOpen}
        onKeyPress={setOpen}
        role="button"
        tabIndex={0}
      >
        <span>{title}</span>
        {openAccordion ? (
          <UpCaret className={styles.caret} fillColor={fillColor} />
        ) : (
          <DownCaret className={styles.caret} fillColor={fillColor} />
        )}
      </div>
      <Collapse
        isOpen={openAccordion}
        childProps={{ 'aria-hidden': openAccordion ? 'false' : 'true' }}
      >
        <div className={styles['accordion-body']}>
          {children || description}
        </div>
      </Collapse>
    </div>
  );
};

Accordion.propTypes = {
  /** Childen to be in the body */
  title: oneOfType([string, node]).isRequired,
  children: node,
  /** Descriptions to be in the body. Children will override this */
  className: string,
  /** callback when header is clicked */
  description: oneOfType([string, node]),
  /** controls if open */
  onClick: func,
  open: bool,
  /** The title of the header */
  styleMode: string,
};

Accordion.defaultProps = {
  children: null,
  className: '',
  description: null,
  onClick: null,
  open: false,
  styleMode: 'light',
};

export default Accordion;
