export default function PokemonService()
{
    const API = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

    function getList()
    {
        fetch(API)
        .then((response) =>
        {
            return response.json();
        })
        .then((results)=>
        {
            console.log(results.results);
            return results.results;
        })
        .catch(() =>
        {
            console.log("Error to retrieve");
        })
    }

    return Object.freeze({
        getList
    });
}