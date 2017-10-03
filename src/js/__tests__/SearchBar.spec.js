/* eslint-disable new-cap */
import React from 'react';

import { MuiShallowWithContext } from '../_testUtils';
import { SearchBar, TEST } from '../components/SearchBar';

test('SearchBar renders children', () => {
  const component = MuiShallowWithContext(<SearchBar onSearchChange={() => {}} />);
  expect(component.length).toBe(1);
});

test('SearchBar renders LinearProgress when "fetchingResults" is true', () => {
  const component = MuiShallowWithContext(<SearchBar onSearchChange={() => {}} />);
  component.setState({ fetchingResults: true });
  expect(component.find('LinearProgress').length).toBe(1);
});

test('SearchBar does not render LinearProgress when "fetchingResults" is false', () => {
  const component = MuiShallowWithContext(<SearchBar onSearchChange={() => {}} />);
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

