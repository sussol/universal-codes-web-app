import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../components/App';
import { Search } from '../components/Search';

test('App component can render children', () => {
  const component = shallow(<App><Search /></App>);
  expect(component.find(Search).length).toBe(1);
});
