/* eslint-disable new-cap */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MuiMountWithContext } from '../_testUtils';
import { SearchBar, TEST } from '../components/SearchBar';

// see: http://airbnb.io/enzyme/docs/installation/index.html
Enzyme.configure({ adapter: new Adapter() });

test('SearchBar renders children', () => {
  const component = MuiMountWithContext(<SearchBar onSearchChange={() => {}} />);
  expect(component.length).toBe(1);
});

test('SearchBar renders LinearProgress when "fetchingResults" is true', () => {
  const component = MuiMountWithContext(<SearchBar onSearchChange={() => {}} />);
  component.setState({ fetchingResults: true });
  expect(component.find('LinearProgress').length).toBe(1);
});

test('SearchBar does not render LinearProgress when "fetchingResults" is false', () => {
  const component = MuiMountWithContext(<SearchBar onSearchChange={() => {}} />);
  expect(component.find('LinearProgress').length).toBe(0);
});

test('buildApiUrl returns correct string for starts-with search', () => {
  const state = { searchTerm: 'hello', startsWithSearch: true };
  expect(TEST.buildApiUrl(state)).toBe('https://yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev/items?search=hello&exact=false');
});

test('buildApiUrl returns correct string for fuzzy search', () => {
  const state = { searchTerm: 'hello', startsWithSearch: false };
  expect(TEST.buildApiUrl(state)).toBe('https://yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev/items?search=hello&fuzzy=true');
});

test('buildApiUrl returns default if startsWithSearch is undefined', () => {
  const state = { searchTerm: 'hello', startsWithSearch: false };
  expect(TEST.buildApiUrl(state)).toBe('https://yadaiamy6e.execute-api.ap-southeast-2.amazonaws.com/dev/items?search=hello&fuzzy=true');
});

