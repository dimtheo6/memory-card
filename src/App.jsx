import PokemonList from "./Components/pokemon";
import Header from "./Components/header";
import { useState } from "react";
import SelectLevel from "./Components/selectLevel";


export default function App() {
  const [cards, setCards] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  return (
    <div className="container">
      {gameStart ? (
        <>
          
          <Header />
          
          <PokemonList cards={cards} setGameStart={setGameStart}/>
        </>
      ) : (
        <>
         <div className="overlay"></div>
         <SelectLevel setCards={setCards} setGameStart={setGameStart} />
        </>
        
      )}
    </div>
  );
}
