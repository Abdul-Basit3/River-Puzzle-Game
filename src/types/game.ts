export type Entity = 'farmer' | 'sheep' | 'wolf' | 'cabbage';
export type Location = 'left' | 'right' | 'boat';

export interface GamePosition {
  farmer: Location;
  sheep: Location;
  wolf: Location;
  cabbage: Location;
}

export interface GameStats {
  moves: number;
  time: number;
  score: number;
}

export interface GameProgress {
  currentCrossing: number;
  totalCrossings: number;
}
