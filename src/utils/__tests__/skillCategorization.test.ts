// Tests for skill categorization utilities

import { describe, it, expect } from 'vitest';
import {
  isGoodBuff,
  isWorstSkill,
  isBadSkill,
  isDirectDamage,
  categorizeSkills,
} from '../skillCategorization';

describe('skillCategorization', () => {
  describe('isGoodBuff', () => {
    it('should identify skill damage as good', () => {
      expect(isGoodBuff('20% Skill Damage')).toBe(true);
      expect(isGoodBuff('30% Skill Damage')).toBe(true);
    });

    it('should identify basic attack damage as good', () => {
      expect(isGoodBuff('50% Basic Attack Damage')).toBe(true);
    });

    it('should exclude 60% basic attack damage', () => {
      expect(isGoodBuff('60% Basic Attack Damage')).toBe(false);
    });

    it('should exclude reduction skills', () => {
      expect(isGoodBuff('12% Reduction Basic Attack Damage')).toBe(false);
    });
  });

  describe('isWorstSkill', () => {
    it('should identify 180/DPS as worst', () => {
      expect(isWorstSkill('180/DPS Attacking Group Center, Club, Landmark')).toBe(true);
    });

    it('should identify world building guard damage as worst', () => {
      expect(isWorstSkill('30% Damage World Building Guard')).toBe(true);
      expect(isWorstSkill('36% Damage to World Building Guard')).toBe(true);
    });

    it('should exclude damage-dealing skills', () => {
      expect(isWorstSkill('10 sec/1800 Damage')).toBe(false);
    });
  });

  describe('isDirectDamage', () => {
    it('should identify 60% basic attack damage as best', () => {
      expect(isDirectDamage('60% Basic Attack Damage')).toBe(true);
    });

    it('should identify time-based damage as best', () => {
      expect(isDirectDamage('10 sec/1800 Damage')).toBe(true);
    });
  });

  describe('categorizeSkills', () => {
    it('should categorize skills correctly', () => {
      const skills = [
        '60% Basic Attack Damage',
        '20% Skill Damage',
        '180/DPS Attacking Group Center, Club, Landmark',
        'Gold Brick Gathering',
      ];

      const result = categorizeSkills(skills);

      expect(result.bestSkills).toContain('60% Basic Attack Damage');
      expect(result.goodSkills).toContain('20% Skill Damage');
      expect(result.worstSkills).toContain('180/DPS Attacking Group Center, Club, Landmark');
      expect(result.badSkills).toContain('Gold Brick Gathering');
    });
  });
});
