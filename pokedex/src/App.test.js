import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('contains title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/pokedex/i);
  expect(linkElement).toBeInTheDocument();
});

test('search pokemon', () => {
  let inputSearch;
  let button;
  act(() => {
    const { getByPlaceholderText, getByText, container } = render(<App />);
    inputSearch = getByPlaceholderText(/Search/i);
    button = container.querySelector("button[name = 'bSearch']");
    fireEvent.change(inputSearch, { target: {value: '132'}});
    //fireEvent.click(button);
  });
  //screen.debug();

  expect(inputSearch.value).toBe('132');
})