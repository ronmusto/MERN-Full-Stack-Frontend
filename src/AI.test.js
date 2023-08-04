import React from 'react';
import { render } from '@testing-library/react';
import AI from './pages/AI';

test('renders without crashing', () => {
  render(<AI />);
});
