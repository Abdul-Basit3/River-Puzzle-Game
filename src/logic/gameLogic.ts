import { GamePosition, Entity } from '../types/game';

export const INITIAL_POSITION: GamePosition = {
  farmer: 'left',
  sheep: 'left',
  wolf: 'left',
  cabbage: 'left',
};

export const WINNING_POSITION: GamePosition = {
  farmer: 'right',
  sheep: 'right',
  wolf: 'right',
  cabbage: 'right',
};

export function isValidState(position: GamePosition): { valid: boolean; reason?: string } {
  const leftBank: Entity[] = [];
  const rightBank: Entity[] = [];

  (Object.keys(position) as Entity[]).forEach((entity) => {
    if (position[entity] === 'left') leftBank.push(entity);
    if (position[entity] === 'right') rightBank.push(entity);
  });

  // Check left bank
  if (!leftBank.includes('farmer')) {
    if (leftBank.includes('wolf') && leftBank.includes('sheep')) {
      return { valid: false, reason: 'The wolf ate the sheep!' };
    }
    if (leftBank.includes('sheep') && leftBank.includes('cabbage')) {
      return { valid: false, reason: 'The sheep ate the cabbage!' };
    }
  }

  // Check right bank
  if (!rightBank.includes('farmer')) {
    if (rightBank.includes('wolf') && rightBank.includes('sheep')) {
      return { valid: false, reason: 'The wolf ate the sheep!' };
    }
    if (rightBank.includes('sheep') && rightBank.includes('cabbage')) {
      return { valid: false, reason: 'The sheep ate the cabbage!' };
    }
  }

  return { valid: true };
}

export function canMoveEntity(entity: Entity, position: GamePosition): boolean {
  if (entity === 'farmer') return true;
  
  // Other entities can only move if they're with the farmer
  return position[entity] === position.farmer;
}

export function isBoatFull(position: GamePosition): boolean {
  const inBoat = (Object.keys(position) as Entity[]).filter(
    (entity) => position[entity] === 'boat'
  );
  return inBoat.length >= 2;
}

export function getBoatSide(position: GamePosition): 'left' | 'right' {
  return position.farmer === 'left' || position.farmer === 'boat' ? 'left' : 'right';
}

export function isWinning(position: GamePosition): boolean {
  return (
    position.farmer === 'right' &&
    position.sheep === 'right' &&
    position.wolf === 'right' &&
    position.cabbage === 'right'
  );
}

export function isRoundComplete(position: GamePosition, currentCrossing: number): boolean {
  // Even crossings: everyone should be on the right
  // Odd crossings: everyone should be on the left
  const targetSide = currentCrossing % 2 === 0 ? 'right' : 'left';
  
  return (
    position.farmer === targetSide &&
    position.sheep === targetSide &&
    position.wolf === targetSide &&
    position.cabbage === targetSide
  );
}

export function calculateScore(moves: number, time: number): number {
  const optimalMoves = 7 * 20; // 7 moves per crossing * 20 crossings
  const baseScore = 10000;
  
  // Penalty for extra moves
  const movePenalty = Math.max(0, (moves - optimalMoves) * 10);
  
  // Bonus for fast completion (under 10 minutes)
  const timeBonus = time < 600 ? Math.max(0, (600 - time) * 5) : 0;
  
  // Perfect solution bonus
  const perfectBonus = moves === optimalMoves ? 5000 : 0;
  
  return Math.max(0, baseScore - movePenalty + timeBonus + perfectBonus);
}
