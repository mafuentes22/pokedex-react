import React from 'react';
import './pokemonContainer.css';
import Pokemon from '../pokemon/pokemon';

class PokemonContainer extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            offset: 0,
            total: 0,
            pokemones: []
        }
    }



    componentDidMount()
    {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        .then((response) =>
        {
            return response.json();
        })
        .then((results)=>
        {
            //console.log(results.results);
            this.setState({
                total: results.count,
                pokemones: results.results
            })
        })
        .catch(() =>
        {
            console.log("Error to retrieve");
        })
    }

    getPokemons(band)
    {
        console.log(band);
        let newOffset = 0;
        if(band === 0 && this.state.offset > 0)
            newOffset = this.state.offset - 20;
        else if(band === 1 && this.state.offset < this.state.total)
            newOffset = this.state.offset + 20;
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${newOffset}`)
        .then((response) =>
        {
            return response.json();
        })
        .then((results)=>
        {
            //console.log(results.results);
            this.setState({
                offset: newOffset,
                pokemones: results.results
            })
        })
        .catch(() =>
        {
            console.log("Error to retrieve");
        });
    }
    render()
    {
        return(
            <div className="pokemons-list">
                <div className="arrows">
                    <button name="arrowleft" onClick={() => { this.getPokemons(0); }}>
                    <i className="fas fa-chevron-left"></i>
                    </button>
                        <p>{this.state.offset + 1 } to {this.state.offset + 20} of {this.state.total}</p>
                    <button name="arrowright" onClick={() => {this.getPokemons(1);}}>
                    <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                { 
                    this.state.pokemones.map((value, index) => {
                    return <Pokemon key={index} pokemon ={value} />
                    })
                }
            </div>
        )
    }
}

export default PokemonContainer;