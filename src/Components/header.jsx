import MusicButton from "./music";

export default function Header() {
  return (
    <header>
      <h1>Pokemon Memory Game</h1>
      <p>Score Points by clicking a different card after each shuffle</p>

      <MusicButton />
      <div className="info">?</div>
    </header>
  );
}
