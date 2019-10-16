import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

describe('Table', () => {
  it('should render children', () => {
    const wrapper = shallow(<Table>Yo!</Table>);

    expect(wrapper.text()).toBe('Yo!');
  });

  it('should pass down all attributes', () => {
    const wrapper = shallow(<Table data-table="yes">Yo!</Table>);

    expect(wrapper.prop('data-table')).toContain('yes');
  });

  // NOTE: CSS doesn't work with CRA/Jest just yet
  // it('should render modifier classes', () => {
  //   const wrapper = shallow(
  //     <Table size="sm" bordered striped dark hover fixedColumns styleMode>
  //       Yo!
  //     </Table>,
  //   );
  //
  //   expect(wrapper.text()).toBe('Yo!');
  //   expect(wrapper.hasClass('table')).toBe(true);
  //   expect(wrapper.hasClass('table-sm')).toBe(true);
  //   expect(wrapper.hasClass('table-bordered')).toBe(true);
  //   expect(wrapper.hasClass('striped')).toBe(true);
  //   expect(wrapper.hasClass('table-hover')).toBe(true);
  //   expect(wrapper.hasClass('table-fixed')).toBe(true);
  //   expect(wrapper.hasClass('dark')).toBe(true);
  // });

  it('should render responsive wrapper class', () => {
    const wrapper = shallow(<Table responsive>Yo!</Table>);

    expect(wrapper.type()).toBe('div');
    expect(wrapper.children().type()).toBe('table');
  });
});
