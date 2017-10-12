/* eslint-disable new-cap */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MuiShallowWithContext } from '../_testUtils';
import { Search } from '../components/Search';

// see: http://airbnb.io/enzyme/docs/installation/index.html
Enzyme.configure({ adapter: new Adapter() });

test('App component can render children', () => {
  const component = MuiShallowWithContext(<Search />);
  expect(component.length).toBe(1);
});

test('Snackbar is rendered', () => {
  const component = MuiShallowWithContext(<Search />);
  expect(component.find('Snackbar').length).toBe(1);
});

test('Snackbar is rendered with initial "open" prop === "false"', () => {
  const component = MuiShallowWithContext(<Search />);
  expect(component.find('Snackbar').props().open).toBe(false);
});

test('Snackbar "open" prop is "true" when no results', () => {
  const component = MuiShallowWithContext(<Search />);
  component.setState({ resultData: [], searchTerm: 'axsdd' });
  expect(component.find('Snackbar').props().open).toBe(true);
});
