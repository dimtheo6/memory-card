import ReactDom from "react-dom";

export default function GameOverModal({ open, onPLayAgain,onQuit, score,winner }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="gameOverModal">
        <div className="wrapper">
        
          <h2>{winner ? 'You Won!' : 'Game Over!'}</h2>
          <img
            src={winner ? '/images/pikaDancing.gif' : '/images/pikaCrying.webp'}
            style={{ width: 250, height: 200 }}
            alt="pikachu crying"
          />
          <p>Your final score is <b>{score}</b></p>
        </div>

        <div className="buttonWrapper">
          <button className="playAgain" onClick={onPLayAgain}>
            Restart
          </button>
          <button className="quit" onClick={onQuit}>Quit</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
