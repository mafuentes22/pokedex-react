import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import logo from './utils/logo.png';


import PokemonContainer from './pokemon-cont/pokemonContainer';
import PokemonDetail from './pokemon-detail/pokemonDetail';

function App() {
  const nameForm = React.useRef(null);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);

  const handleClickEvent = () => {
    const form = nameForm.current
    setSearch(form['search'].value.toString().toLowerCase());
    setCount(count+1);
    form['search'].value = '';
  }

  return (
    <div className="App">
      <div className="top-bar">
        <h2>Pokedex</h2>
        <div className="logo">
          <img alt="" src={logo}></img>
        </div>
      </div>
      <div className="content-container">
        <div className="search-container">
          <form ref={nameForm}>
            <input className="search-input" type="search" name="search" placeholder="Search"></input>
          </form>
          <button className="search-button" name="bSearch" onClick={handleClickEvent}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="pokemons-container">
          <Router>
            <PokemonContainer/>
            <Switch>
              {/* <Route path="/pokemon/:id" component={PokemonDetail} /> */}
              <Route path="/pokemon/:id" render={(props) => <PokemonDetail {...props} search={search} count={count} />} />
              <Route path="/" render={(props) => <PokemonDetail {...props} id={0} search={search} count={count}/>} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
