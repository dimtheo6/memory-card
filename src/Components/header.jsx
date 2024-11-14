import MusicButton from "./music";

export default function Header() {
  const handleInfoClick = () => {
    const info = document.querySelector(".info-text");

    info.classList.toggle("open");
  };

  return (
    <header>
      <h1>Pokemon Memory Game</h1>

      <MusicButton />
      <div className="info" onClick={handleInfoClick}>
        ?
      </div>
      <div className="info-text">Don&apos;t click on the same card twice!</div>
    </header>
  );
}
