// Tests for artist calculation utilities

import { describe, it, expect } from 'vitest';
import { Artist } from '../../types';
import { calculateArtistPoints, getLetterGrade } from '../artistCalculations';

describe('artistCalculations', () => {
  describe('calculateArtistPoints', () => {
    it('should calculate points correctly for best skills', () => {
      const artist: Artist = {
        id: 1,
        name: 'Test',
        group: 'Test',
        genre: 'Electronic',
        position: 'Center',
        rank: 'SSR',
        skills: ['Skill 1', '60% Basic Attack Damage', '20% Skill Damage'],
        description: 'Test',
      };

      const points = calculateArtistPoints(
        artist,
        ['60% Basic Attack Damage'],
        ['20% Skill Damage'],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      );

      expect(points).toBe(16); // 10 (best) + 6 (good)
    });

    it('should skip skill 1 (index 0)', () => {
      const artist: Artist = {
        id: 1,
        name: 'Test',
        group: 'Test',
        genre: 'Electronic',
        position: 'Center',
        rank: 'SSR',
        skills: ['Terrible Skill', 'Good Skill'],
        description: 'Test',
      };

      const points = calculateArtistPoints(
        artist,
        [],
        ['Good Skill'],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      );

      expect(points).toBe(6); // Only good skill counted, terrible skill at index 0 skipped
    });
  });

  describe('getLetterGrade', () => {
    it('should return S for 14+ points', () => {
      expect(getLetterGrade(14)).toBe('S');
      expect(getLetterGrade(20)).toBe('S');
    });

    it('should return A for 10-13 points', () => {
      expect(getLetterGrade(10)).toBe('A');
      expect(getLetterGrade(13)).toBe('A');
    });

    it('should return B for 5-9 points', () => {
      expect(getLetterGrade(5)).toBe('B');
      expect(getLetterGrade(9)).toBe('B');
    });

    it('should return C for 0-4 points', () => {
      expect(getLetterGrade(0)).toBe('C');
      expect(getLetterGrade(4)).toBe('C');
    });

    it('should return F for negative points', () => {
      expect(getLetterGrade(-1)).toBe('F');
      expect(getLetterGrade(-5)).toBe('F');
    });
  });
});
