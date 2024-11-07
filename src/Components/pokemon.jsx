import  { useEffect, useState } from 'react';
import Shuffle from './shuffle';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonIds, setPokemonIds] = useState([]);

  const cards = 5;

  function getRandomInt() {
    return Math.floor(Math.random() * 151) + 1;
  }

  const handleShuffle = () =>{
    const shuffledPokemons = [...pokemons]
    Shuffle(shuffledPokemons)
    setPokemons(shuffledPokemons)
  }

  // Generate random Pokémon IDs only once when the component mounts
  useEffect(() => {
    const ids = [];
    for (let i = 0; i < cards; i++) {
      ids.push(getRandomInt());
    }
    setPokemonIds(ids);
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await Promise.all(
          pokemonIds.map(id =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
          )
        );
        console.log(data)
        setPokemons(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    if (pokemonIds.length > 0) { // Only fetch if there are IDs
      fetchPokemons();
    }
  }, [pokemonIds]);

  return (
    <div>
      {pokemons.length > 0 ? (
        pokemons.map(pokemon => (
          <div key={pokemon.id} className='card' onClick={handleShuffle}>
            <img src={pokemon.sprites.front_default} alt="pokemon card" />
            <h1>{pokemon.name}</h1>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonList;
