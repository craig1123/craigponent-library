import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <Navbar>
        <span>Ello World</span>
      </Navbar>,
    );
    expect(wrapper.find('span').text()).toBe('Ello World');
  });
});
