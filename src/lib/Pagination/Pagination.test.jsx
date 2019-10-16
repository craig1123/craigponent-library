import React from 'react';
import { mount } from 'enzyme';
import { getLastChunkPage, getFirstChunkPage } from './pagination.viewStates';
import Pagination from './Pagination';

const defaultProps = {
  activePage: 1,
  setActivePage: () => {},
  totalPages: 10,
};

describe('Pagination', () => {
  it('should pass className down', () => {
    const wrapper = mount(<Pagination {...defaultProps} className="pag" />);

    expect(wrapper.find('nav').hasClass('pag')).toEqual(true);
  });

  it('should pass other props down', () => {
    const wrapper = mount(
      <Pagination {...defaultProps} data-test="test" className="pag" />,
    );

    expect(wrapper.find('nav').prop('data-test')).toBe('test');
  });

  it('should render null if pages is less than one', () => {
    const wrapper = mount(
      <Pagination {...defaultProps} totalPages={1} className="pag" />,
    );

    expect(wrapper.find('.pag').html()).toBe(null);
  });

  it('should render arrowsOnly prop', () => {
    const wrapper = mount(
      <Pagination
        {...defaultProps}
        pageSize={10}
        totalElements={100}
        arrowsOnly
      />,
    );

    expect(
      wrapper
        .find('div')
        .at(0)
        .text(),
    ).toBe('1-10 of 100');
  });

  it('should render isMobile prop', () => {
    const wrapper = mount(<Pagination {...defaultProps} isMobile />);

    // 5 pages + 2 carets = 7 children
    expect(wrapper.find('ul').children().length).toEqual(7);
  });
});

describe('getLastChunkPage', () => {
  it('should figure out the last page chunk given the parms', () => {
    let pagesLeft = 18;
    let props = {
      activePage: 2,
      chunkSize: 5,
      totalPages: 20,
      isMobile: false,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(7);

    pagesLeft = 14;
    props = {
      activePage: 6,
      chunkSize: 5,
      totalPages: 20,
      isMobile: false,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(8);

    pagesLeft = 11;
    props = {
      activePage: 9,
      chunkSize: 5,
      totalPages: 20,
      isMobile: true,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(11);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 5,
      totalPages: 20,
      isMobile: true,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(20);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 3,
      totalPages: 20,
      isMobile: false,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(17);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 7,
      totalPages: 20,
      isMobile: false,
    };
    expect(getLastChunkPage(pagesLeft, props)).toEqual(20);
  });
});

describe('getFirstChunkPage', () => {
  it('should figure out the last page chunk given the parms', () => {
    let pagesLeft = 18;
    let props = {
      activePage: 2,
      chunkSize: 5,
      totalPages: 20,
      isMobile: false,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(1);

    pagesLeft = 14;
    props = {
      activePage: 6,
      chunkSize: 5,
      totalPages: 20,
      isMobile: false,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(4);

    pagesLeft = 11;
    props = {
      activePage: 9,
      chunkSize: 5,
      totalPages: 20,
      isMobile: true,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(7);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 5,
      totalPages: 20,
      isMobile: true,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(16);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 3,
      totalPages: 20,
      isMobile: false,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(15);

    pagesLeft = 4;
    props = {
      activePage: 16,
      chunkSize: 7,
      totalPages: 20,
      isMobile: false,
    };
    expect(getFirstChunkPage(pagesLeft, props)).toEqual(12);
  });
});
