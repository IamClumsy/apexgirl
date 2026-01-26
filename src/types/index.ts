// Shared types and enums for the application

export interface Artist {
  id: number;
  name: string;
  group: string;
  genre: string;
  position: string;
  rank: string;
  rating?: number | null;
  skills: string[];
  description: string;
  image?: string;
  thoughts?: string;
  build?: string;
  photos?: string;
}

export enum Rank {
  SSR = 'SSR',
  UR = 'UR',
  SR = 'SR',
  R = 'R',
}

export enum Genre {
  ELECTRONIC = 'Electronic',
  POP = 'Pop',
  ROCK = 'Rock',
  HIP_HOP = 'Hip-Hop',
  JAZZ = 'Jazz',
  CLASSICAL = 'Classical',
}

export enum Position {
  CENTER = 'Center',
  VOCALIST = 'Vocalist',
  DANCER = 'Dancer',
  RAPPER = 'Rapper',
}

export enum LetterGrade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  F = 'F',
}

export const SKILL_POINTS = {
  BEST: 10,
  GOOD: 6,
  OKAY: 3,
  BAD: 0,
  WORST: -1,
} as const;

export const GRADE_THRESHOLDS = {
  S: 15,
  A: 10,
  B: 5,
  C: 0,
} as const;
