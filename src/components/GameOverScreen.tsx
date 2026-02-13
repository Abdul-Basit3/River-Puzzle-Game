import '../styles/GameOverScreen.css';

interface GameOverScreenProps {
  reason: string;
  onRestart: () => void;
  onMenu: () => void;
}

function GameOverScreen({ reason, onRestart, onMenu }: GameOverScreenProps) {
  return (
    <div className="gameover-screen">
      <div className="gameover-content">
        <h1 className="gameover-title">💥 Game Over</h1>
        
        <div className="gameover-reason">
          <p>{reason}</p>
        </div>

        <div className="gameover-hint">
          <h3>Remember:</h3>
          <ul>
            <li>🐺 Wolf + 🐑 Sheep = Danger!</li>
            <li>🐑 Sheep + 🥬 Cabbage = Danger!</li>
            <li>🧑‍🌾 Farmer must supervise dangerous pairs</li>
          </ul>
        </div>

        <div className="gameover-buttons">
          <button className="btn btn-primary" onClick={onRestart}>
            Try Again
          </button>
          <button className="btn btn-secondary" onClick={onMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;
