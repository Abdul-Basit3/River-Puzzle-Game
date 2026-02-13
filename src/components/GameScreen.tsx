import { useState, useEffect } from 'react';
import { GamePosition, Entity } from '../types/game';
import {
  INITIAL_POSITION,
  isValidState,
  canMoveEntity,
  isBoatFull,
  isRoundComplete,
  calculateScore,
} from '../logic/gameLogic';
import { soundManager } from '../utils/soundManager';
import { backgroundMusic } from '../utils/backgroundMusic';
import River from './River';
import Bank from './Bank';
import Boat from './Boat';
import Stats from './Stats';
import '../styles/GameScreen.css';

interface GameScreenProps {
  onComplete: (moves: number, score: number) => void;
  onGameOver: (reason: string) => void;
}

const TOTAL_CROSSINGS = 20;

function GameScreen({ onComplete, onGameOver }: GameScreenProps) {
  const [position, setPosition] = useState<GamePosition>(INITIAL_POSITION);
  const [boatSide, setBoatSide] = useState<'left' | 'right'>('left');
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCrossing, setCurrentCrossing] = useState(0);

  useEffect(() => {
    // Start background music when game starts
    backgroundMusic.start();

    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      backgroundMusic.stop();
    };
  }, []);

  const handleEntityClick = (entity: Entity) => {
    if (isAnimating) return;

    const currentLocation = position[entity];

    // If entity is on a bank, try to board the boat
    if (currentLocation === 'left' || currentLocation === 'right') {
      if (currentLocation !== boatSide) return;
      if (!canMoveEntity(entity, position)) return;
      if (entity !== 'farmer' && isBoatFull(position)) return;

      // Play entity-specific sound
      soundManager.play(entity);
      setPosition({ ...position, [entity]: 'boat' });
    }
    // If entity is in boat, disembark to current side
    else if (currentLocation === 'boat') {
      soundManager.play(entity);
      setPosition({ ...position, [entity]: boatSide });
    }
  };

  const handleCrossRiver = () => {
    if (isAnimating) return;
    if (position.farmer !== 'boat') return;

    setIsAnimating(true);
    soundManager.play('boat');

    setTimeout(() => {
      const newSide = boatSide === 'left' ? 'right' : 'left';
      const newPosition = { ...position };

      // Move all entities in boat to the new side
      (Object.keys(position) as Entity[]).forEach((entity) => {
        if (position[entity] === 'boat') {
          newPosition[entity] = newSide;
        }
      });

      setPosition(newPosition);
      setBoatSide(newSide);
      setMoves(moves + 1);
      setIsAnimating(false);

      // Check game state after animation
      const validation = isValidState(newPosition);
      if (!validation.valid) {
        soundManager.play('error');
        setTimeout(() => onGameOver(validation.reason!), 500);
      } else if (isRoundComplete(newPosition, currentCrossing)) {
        const nextCrossing = currentCrossing + 1;
        
        if (nextCrossing >= TOTAL_CROSSINGS) {
          // Game complete!
          soundManager.play('complete');
          const score = calculateScore(moves + 1, time);
          setTimeout(() => onComplete(moves + 1, score), 500);
        } else {
          // Round complete, continue to next crossing
          soundManager.play('success');
          setCurrentCrossing(nextCrossing);
        }
      } else {
        soundManager.play('success');
      }
    }, 1000);
  };

  return (
    <div className="game-screen">
      <Stats moves={moves} time={time} currentCrossing={currentCrossing} totalCrossings={TOTAL_CROSSINGS} />
      
      <div className="game-board">
        <Bank
          side="left"
          entities={Object.keys(position).filter(
            (e) => position[e as Entity] === 'left'
          ) as Entity[]}
          onEntityClick={handleEntityClick}
          disabled={isAnimating || boatSide !== 'left'}
        />

        <River>
          <Boat
            side={boatSide}
            entities={Object.keys(position).filter(
              (e) => position[e as Entity] === 'boat'
            ) as Entity[]}
            onEntityClick={handleEntityClick}
            onCross={handleCrossRiver}
            isAnimating={isAnimating}
            canCross={position.farmer === 'boat'}
          />
        </River>

        <Bank
          side="right"
          entities={Object.keys(position).filter(
            (e) => position[e as Entity] === 'right'
          ) as Entity[]}
          onEntityClick={handleEntityClick}
          disabled={isAnimating || boatSide !== 'right'}
        />
      </div>
    </div>
  );
}

export default GameScreen;
