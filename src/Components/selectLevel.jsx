export default function SelectLevel({ setCards, setGameStart }) {
  const handleClick = (e) => {
    const level = e.target.textContent.toLowerCase();

    if (level === "easy") {
      setCards(5);
    } else if (level === "normal") {
      setCards(10);
    } else {
      setCards(15);
    }

    setGameStart(true);
  };

  return (
    <div className="startScreen">

      <h3>Select your difficulty Level</h3>
      <div className="levelWrapper">
        <button className="level" onClick={handleClick}>
          Easy
        </button>
        <button className="level" onClick={handleClick}>
          Normal
        </button>
        <button className="level" onClick={handleClick}>
          Hard
        </button>
      </div>
    </div>
  );
}
