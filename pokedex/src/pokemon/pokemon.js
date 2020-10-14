import React from 'react';
import './pokemon.css';
import { Link } from 'react-router-dom';

class Pokemon extends React.Component
{
    render()
    {
        return(
            <div className="pokemon">
                <Link to={`/pokemon/${this.props.pokemon.url.match(/\/[0-9]+\//).toString().replace(/\//g, '')}`}>
                    <div className="pokemon-container">
                        {/* <div className="img-container">
                            <img alt="" src="https://nintendo.pe/wp-content/uploads/2018/05/f51d08be05919290355ac004cdd5c2d6.png"></img>
                        </div> */}
                        <div className="text-container">
                            <p>{this.props.pokemon.url.match(/\/[0-9]+\//).toString().replace(/\//g, '')}</p>
                            <p>{this.props.pokemon.name.toUpperCase()}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Pokemon;