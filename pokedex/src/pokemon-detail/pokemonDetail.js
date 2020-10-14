import React from 'react';
import './pokemonDetail.css';
import defImg from '../utils/default.JPG';
//import {withRouter} from 'react-router-dom';

class PokemonDetail extends React.Component
{
    constructor(props)
    {
        super(props);
        //console.log(this.props.match.params);
        this.state = {
            id: this.props.id ? 1 : this.props.match.params.id,
            pokemon: {},
            loaded: false
        }
    }

    componentDidMount()
    {
        //let idpok = this.props.match.params.id;
        let idpok = this.state.id;
        //console.log(idpok);
        if(idpok)
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${idpok}`)
            .then((response) =>
            {
                return response.json();
            })
            .then((result)=>{
                this.setState({
                    id: idpok,
                    pokemon: result,
                    loaded: true
                })
                //console.log(result);
            })
            .catch(() =>
            {
                console.log("Error to retrieve");
            });
        }
    }    

    componentDidUpdate(prevProps)
    {
        console.log(this.props);
        
        let oldId = prevProps.match.params.id;
        let newId = this.props.match.params.id;

        let newSearch = this.props.search;
        let oldCount = prevProps.count;
        let newCount = this.props.count;

        //console.log(newSearch);
        if (newId !== oldId || oldCount !== newCount)
        {
            // if(newId !== oldId)
            //     this.props.search = '';
            let idpok = newId !== oldId ? this.props.match.params.id : newSearch;
            fetch(`https://pokeapi.co/api/v2/pokemon/${idpok}`)
            .then((response) =>
            {
                return response.json();
            })
            .then((result)=>{
                this.setState({
                    id: idpok,
                    pokemon: result,
                    loaded: true
                })
                //console.log(result);
            })
            .catch(() =>
            {
                this.setState({
                    id: 0,
                    pokemon: [],
                    loaded: false
                })
            });
        }
        
    }


    render()
    {
        const abilities = this.state.loaded ? this.state.pokemon.abilities.map((value, index) =>
        {
            return (
                <p key={index}>{value.ability.name.toUpperCase()}</p>
            );
        })
        :
        '';

        const types = this.state.loaded ? this.state.pokemon.types.map((value, index)=>
        {
            return(
                <p key={index}>{value.type.name.toUpperCase()}</p>
            );
        })
        :
        '';
        return (
            
            <div className="pokemon-detail">
                <div className="detail">
                    <div className="img-cont">
                        <img alt="" src={ this.state.loaded ? this.state.pokemon.sprites.front_default : defImg}></img>
                    </div>
                    <div className="stats">
                        <p>{this.state.loaded ? 'ID:  ' + this.state.pokemon.id + ' ' +this.state.pokemon.name.toUpperCase(): '?     ?'}</p>
                        <p>Height: {this.state.loaded ? (this.state.pokemon.height / 10) + 'm' : '?m'}</p>
                        <p>Weight: {this.state.loaded ? (this.state.pokemon.weight / 10) + 'kg' : '?kg'}</p>
                        <p>Abilities</p>
                        <div className="abilities">
                            {abilities ? abilities : '?'}
                        </div>
                        <p>Types</p>
                        <div className="types">
                            {types ? types : '?'}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default PokemonDetail;