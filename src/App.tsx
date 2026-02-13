import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import CompleteScreen from './components/CompleteScreen';
import GameOverScreen from './components/GameOverScreen';
import './styles/App.css';

export type GameState = 'start' | 'playing' | 'complete' | 'gameover';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [finalScore, setFinalScore] = useState(0);
  const [finalMoves, setFinalMoves] = useState(0);
  const [gameOverReason, setGameOverReason] = useState('');

  const handleStart = () => {
    setGameState('playing');
  };

  const handleComplete = (moves: number, score: number) => {
    setFinalMoves(moves);
    setFinalScore(score);
    setGameState('complete');
  };

  const handleGameOver = (reason: string) => {
    setGameOverReason(reason);
    setGameState('gameover');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('start');
  };

  return (
    <div className="app">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && (
        <GameScreen onComplete={handleComplete} onGameOver={handleGameOver} />
      )}
      {gameState === 'complete' && (
        <CompleteScreen
          moves={finalMoves}
          score={finalScore}
          onRestart={handleRestart}
          onMenu={handleBackToMenu}
        />
      )}
      {gameState === 'gameover' && (
        <GameOverScreen
          reason={gameOverReason}
          onRestart={handleRestart}
          onMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
