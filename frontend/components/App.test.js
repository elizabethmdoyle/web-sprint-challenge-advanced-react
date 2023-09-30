import React from 'react';
import {render} from '@testing-library/react';
import AppClass from './AppClass';
import AppFunctional from './AppFunctional';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

test('AppClass rendering', () => {
  render(<AppClass />);
})

test('AppFunctional rendering', () => {
  render(<AppFunctional />);
})
