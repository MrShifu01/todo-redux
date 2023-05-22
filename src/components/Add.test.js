import React from 'react';
import renderer from 'react-test-renderer';

import Add from './Add';

it('renders correctly', () => {
  const tree = renderer.create(<Add />).toJSON();
  expect(tree).toMatchSnapshot();
});