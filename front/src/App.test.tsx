import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { history } from './configureStore'

test('renders learn react link', () => {
  const { getByText } = render(<App history={history}/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
