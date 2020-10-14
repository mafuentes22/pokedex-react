import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';


describe('Basic tests', () =>{
  test('renders title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/pokedex/i);
    expect(linkElement).toBeInTheDocument();
  });

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      count: 1050,
      next: "https://pokeapi.co/api/v2/pokemon?offset=5&limit=5",
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
          name: "venusaur",
          url: "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
          name: "charmander",
          url: "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
          name: "charmeleon",
          url: "https://pokeapi.co/api/v2/pokemon/5/"
        }
      ]
    })
  })
  )

  test('renders pokemon list', async () => {
    await act(async () => render(<App />))
    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
    expect(screen.getByText('CHARMANDER')).toBeInTheDocument();
    expect(screen.getByText(/1050/)).toBeInTheDocument();
  })
});
