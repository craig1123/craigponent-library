/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';

import { addCommas } from './numberInput.helpers';

const NumberInput = forwardRef(({ value, scale, onChange, ...rest }, ref) => {
  const inputNum = ref || useRef(null);
  const [state, setState] = useState(() => ({
    prevValue: '',
    stateValue: value ? addCommas(value, scale) : '',
    selectionStart: 0,
    selectionEnd: 0,
  }));

  const { prevValue, stateValue, selectionStart, selectionEnd } = state;

  const setNumState = newState => setState({ ...state, ...newState });

  useEffect(() => {
    if (value !== undefined && value !== stateValue) {
      setNumState({
        stateValue: addCommas(value, scale),
      });
    }
  }, [value, scale]);

  useEffect(() => {
    if (prevValue !== stateValue && inputNum) {
      inputNum.current.setSelectionRange(selectionStart, selectionEnd);
      setNumState({ prevValue: stateValue });
    }
  }, [stateValue, prevValue]);

  const handleChange = e => {
    const targetValue = e.target.value;
    const finalValue = addCommas(targetValue, scale);

    if (finalValue === null) {
      return;
    }

    // sets caret position to include the commas
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    if (finalValue.length > targetValue.length) {
      start += 1;
      end += 1;
    }

    setNumState({
      prevValue: stateValue,
      stateValue: finalValue,
      selectionStart: start,
      selectionEnd: end,
    });

    if (onChange) {
      onChange(finalValue, e);
    }
  };

  return (
    <Input
      {...rest}
      inputMode="decimal"
      innerRef={inputNum}
      onChange={handleChange}
      value={stateValue}
      type="text"
    />
  );
});

NumberInput.propTypes = {
  onChange: PropTypes.func,
  /** How many numbers are allowed after the decimal */
  scale: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

NumberInput.defaultProps = {
  onChange: null,
  scale: 2,
  value: undefined,
};

export default NumberInput;
