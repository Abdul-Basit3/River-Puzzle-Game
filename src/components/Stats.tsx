import { useState } from 'react';
import { soundManager } from '../utils/soundManager';
import { backgroundMusic } from '../utils/backgroundMusic';
import '../styles/Stats.css';

interface StatsProps {
  moves: number;
  time: number;
  currentCrossing: number;
  totalCrossings: number;
}

function Stats({ moves, time, currentCrossing, totalCrossings }: StatsProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [sfxVolume, setSfxVolume] = useState(soundManager.getVolume() * 100);
  const [musicVolume, setMusicVolume] = useState(backgroundMusic.getVolume() * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
    // Play a test sound when enabling
    if (newState) {
      soundManager.play('click');
    }
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setSfxVolume(volume);
    soundManager.setVolume(volume / 100);
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setMusicVolume(volume);
    backgroundMusic.setVolume(volume / 100);
  };

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Progress:</span>
        <span className="stat-value">{currentCrossing}/{totalCrossings}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Moves:</span>
        <span className="stat-value">{moves}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{formatTime(time)}</span>
      </div>
      <div className="audio-controls">
        <button 
          className="sound-toggle" 
          onClick={toggleSound}
          title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button 
          className="volume-settings-toggle" 
          onClick={() => setShowVolumeControls(!showVolumeControls)}
          title="Volume settings"
        >
          🎚️
        </button>
        {showVolumeControls && (
          <div className="volume-controls">
            <div className="volume-control">
              <label>
                <span className="volume-icon">🔔</span>
                <span className="volume-label">SFX</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxVolume}
                onChange={handleSfxVolumeChange}
                className="volume-slider"
              />
              <span className="volume-value">{Math.round(sfxVolume)}%</span>
            </div>
            <div className="volume-control">
              <label>
                <span className="volume-icon">🎵</span>
                <span className="volume-label">Music</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={handleMusicVolumeChange}
                className="volume-slider"
              />
              <span className="volume-value">{Math.round(musicVolume)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
