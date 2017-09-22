/* global define, it, describe */

import 'jsdom-global/register';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import DataTable from './';

const defaultHeaders = ['header1', 'header2', 'header3'];
const defaultRowData = [
  { header1: 1, header2: 2, header3: 3 },
  { header1: 1, header2: 2, header3: 3 },
];

describe('<DataTable />', () => {
  it('should render rows', () => {
    const wrapper = shallow(
      <DataTable
        headers={defaultHeaders}
        rowData={defaultRowData}
      />
    );

    expect(wrapper.find('.row')).to.have.length(2);
  });

  it('should render special row', () => {
    const specialRowData = {
      header1: 1, header2: 2, header3: 3,
    };

    const wrapper = shallow(
      <DataTable
        headers={defaultHeaders}
        rowData={defaultRowData}
        specialRow={specialRowData}
      />
    );

    expect(wrapper.exists('.special-row'));
  });

  it('should apply transformation to cell', () => {
    const transformations = {
      rows: {
        header1: row => row.header1 * 10,
      },
    };

    const wrapper = shallow(
      <DataTable
        headers={defaultHeaders}
        rowData={defaultRowData}
        transformations={transformations}
      />
    );

    const expectedVal = (defaultRowData[0].header1 * 10).toString();
    expect(wrapper.find('.row .header1').first().text()).to.equal(expectedVal);
  });

  it('should add onClick handler to cell', () => {
    const onButtonClick = sinon.spy();
    const actions = {
      rows: {
        header1: onButtonClick,
      },
    };

    const wrapper = shallow(
      <DataTable
        headers={defaultHeaders}
        rowData={defaultRowData}
        actions={actions}
      />
    );

    wrapper.find('.row .header1').first().simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('should assign row className specified in selectors', () => {
    const selectors = {
      rows: {
        header1: row => row.header1 === 1 ? 'test' : '',
      },
    };

    const wrapper = shallow(
      <DataTable
        headers={defaultHeaders}
        rowData={defaultRowData}
        selectors={selectors}
      />
    );

    expect(wrapper.find('.row .header1').first().hasClass('test'));
  });
});
