import { useEffect } from 'react';
import { soundManager } from '../utils/soundManager';
import '../styles/CompleteScreen.css';

interface CompleteScreenProps {
  moves: number;
  score: number;
  onRestart: () => void;
  onMenu: () => void;
}

function CompleteScreen({ moves, score, onRestart, onMenu }: CompleteScreenProps) {
  useEffect(() => {
    // Save high score to localStorage
    const highScore = localStorage.getItem('riverCrossingHighScore');
    if (!highScore || score > parseInt(highScore)) {
      localStorage.setItem('riverCrossingHighScore', score.toString());
    }
  }, [score]);

  const handleRestart = () => {
    soundManager.play('click');
    onRestart();
  };

  const handleMenu = () => {
    soundManager.play('click');
    onMenu();
  };

  const highScore = localStorage.getItem('riverCrossingHighScore');
  const isNewRecord = highScore ? score >= parseInt(highScore) : true;

  return (
    <div className="complete-screen">
      <div className="complete-content">
        <h1 className="complete-title">🎉 Puzzle Complete!</h1>
        
        {isNewRecord && <div className="new-record">🏆 New High Score!</div>}
        
        <div className="complete-stats">
          <div className="complete-stat">
            <span className="stat-label">Moves Used:</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="complete-stat">
            <span className="stat-label">Your Score:</span>
            <span className="stat-value highlight">{score}</span>
          </div>
          {moves === 7 && (
            <div className="perfect-message">
              ⭐ Perfect Solution! ⭐
            </div>
          )}
        </div>

        <div className="complete-buttons">
          <button className="btn btn-primary" onClick={handleRestart}>
            Play Again
          </button>
          <button className="btn btn-secondary" onClick={handleMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompleteScreen;
