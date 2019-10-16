import React from 'react';
import conditionallyUpdateScrollbar from './conditionallyUpdateScrollbar';
import isArrayOrNodeList from './isArrayOrNodeList';
import setScrollbarWidth from './setScrollbarWidth';

describe('Utils', () => {
  describe('setScrollbarWidth', () => {
    it('should set the document.body style with extra padding', () => {
      document.body.style.paddingRight = null;

      setScrollbarWidth(5);
      expect(document.body.style.paddingRight).toEqual('5px');
    });
  });

  describe('conditionallyUpdateScrollbar', () => {
    it('should conditionallyUpdateScrollbar when isBodyOverflowing is true', () => {
      document.body.style.paddingRight = null;

      conditionallyUpdateScrollbar();
      const parsePx = document.body.style.paddingRight.replace('px', '');
      expect(Number(parsePx)).toBeGreaterThan(0);
    });
  });

  describe('isArrayOrNodeList', () => {
    it('should return false if elements are null', () => {
      expect(isArrayOrNodeList(null)).toBe(false);
    });

    it('should return true if elements are an array', () => {
      expect(isArrayOrNodeList([<span />, <div />])).toBe(true);
    });
  });
});
