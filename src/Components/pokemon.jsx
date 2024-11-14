import { useEffect, useState } from "react";
import Shuffle from "./shuffle";
import GameOverModal from "./gameOverModal";
import Tilt from "react-parallax-tilt";
import SoundClick from "./sound";

function PokemonList({ cards, setGameStart }) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [playSound, setPlaySound] = useState(false);

  const flip = "src/sounds/flip.mp3";

  function getRandomInt() {
    return Math.floor(Math.random() * 151) + 1;
  }

  const handleShuffle = () => {
    const shuffledPokemons = [...pokemons];
    Shuffle(shuffledPokemons);
    setPokemons(shuffledPokemons);
  };

  const sound = () => {
    setPlaySound(true);

    setTimeout(() => setPlaySound(false), 100); // Reset after a short delay
  };

  const onPLayAgain = () => {
    setPokemons([]);
    setGameOver(false);
    setWinner(false);
    getIds();

    setScore(0);
    fetchPokemons();
  };

  const onQuit = () => {
    setGameStart(false);
  };

  const getIds = () => {
    const ids = [];

    while (ids.length < cards) {
      const randomId = getRandomInt();
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }
    setPokemonIds(ids);
  };

  const cardClass = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((item) => {
      item.classList.add("active");
    });

    setTimeout(() => {
      cards.forEach((item) => {
        setTimeout(() => {
          item.classList.remove("active");
        }, 10);
      });

      handleShuffle(); // Shuffle after a successful click
    }, 1000);
  };

  const handleCardClick = (index) => {
    if (gameOver) return;

    const updatedPokemons = [...pokemons];
    const clickedPokemon = updatedPokemons[index];

    sound(); //sets playsound to true

    // Increment click count
    clickedPokemon.clickCount += 1;

    if (score == pokemonIds.length - 1) {
      setGameOver(true);
      setWinner(true);
    }

    if (clickedPokemon.clickCount > 1) {
      // Lose condition: if clicked twice
      setGameOver(true);
    } else {
      // Update state with incremented click count and shuffled Pokémon list

      cardClass();
      setPokemons(updatedPokemons);
      setScore((score) => score + 1);
    }
  };

  useEffect(() => {
    getIds();
  }, []);

  const fetchPokemons = async () => {
    try {
      const data = await Promise.all(
        pokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
        )
      );

      const pokemonsWithClicks = data.map((pokemon) => ({
        ...pokemon,
        clickCount: 0,
      }));

      setPokemons(pokemonsWithClicks);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (pokemonIds.length > 0) {
      // Only fetch if there are IDs
      fetchPokemons();
    }
  }, [pokemonIds]);

  return (
    <div className="main">
      <GameOverModal
        open={gameOver}
        onPLayAgain={onPLayAgain}
        onQuit={onQuit}
        score={score}
        winner={winner}
      />
      <div>
        <h1>Score: {score}</h1>

        <h1>
          {score}/{pokemonIds.length}
        </h1>
        <div className="card_container">
          {pokemons.length > 0 ? (
            pokemons.map((pokemon, index) => (
              <Tilt key={pokemon.id}>
                <div className="card">
                  <SoundClick playSound={playSound} src={flip} />
                  <div
                    className="poke_card"
                    onClick={() => handleCardClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={pokemon.sprites.other.dream_world.front_default}
                      className="poke_image"
                    />
                    <h1 className="poke_name">{pokemon.name}</h1>
                  </div>
                  <div className="card_back">
                    <img src="./src/images/card_back.jpg" alt="" />
                  </div>
                </div>
              </Tilt>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
