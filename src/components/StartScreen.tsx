import { soundManager } from '../utils/soundManager';
import '../styles/StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
}

function StartScreen({ onStart }: StartScreenProps) {
  const handleStart = () => {
    soundManager.play('success');
    onStart();
  };

  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="game-title">🚣 River Crossing Puzzle</h1>
        <p className="game-subtitle">Help the farmer cross the river 20 times!</p>
        
        <div className="instructions">
          <h2>How to Play</h2>
          <ul>
            <li>🧑‍🌾 The farmer must transport a sheep, wolf, and cabbage across the river</li>
            <li>🚤 The boat can carry the farmer plus ONE item at a time</li>
            <li>🐺 The wolf cannot be left alone with the sheep</li>
            <li>🐑 The sheep cannot be left alone with the cabbage</li>
            <li>⚠️ Breaking these rules ends the game!</li>
            <li>🎯 Complete 20 full crossings to win the game</li>
            <li>⭐ Finish with fewer moves for a higher score</li>
          </ul>
        </div>

        <button className="start-button" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
