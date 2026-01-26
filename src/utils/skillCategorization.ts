// Skill categorization utilities shared between SSR and SR pages

export const isGoodBuff = (skill: string): boolean => {
  const t = (skill || '').toLowerCase();
  // Exclude 60% basic attack damage (moved to BEST)
  if (t.includes('60%') && t.includes('basic attack damage')) return false;
  // Exclude 30% skill damage (moved to BEST)
  if (t.includes('30%') && t.includes('skill damage')) return false;
  // Exclude 24% skill damage (moved to BEST)
  if (t.includes('24%') && t.includes('skill damage')) return false;
  // Exclude reduction skills (they get 3 points as Okay)
  if (t.includes('reduc')) return false;
  return (
    t.includes('skill damage') || t.includes('basic attack damage') || t.includes('basic damage')
  );
};

export const isTerribleSkill = (skill: string): boolean => {
  const t = (skill || '').toLowerCase();
  // Exclude damage-dealing skills like "10 sec/1800 Damage"
  const isDamageSkill = t.includes('damage') && (t.includes('sec/') || /\d+\s*damage/.test(t));
  if (isDamageSkill) return false;

  // Exclude 200/DPS defending buildings (HQ, GH, Club, LM)
  const is200DpsDefending =
    t.includes('200/dps') &&
    (t.includes('defending') ||
      t.includes('hq') ||
      t.includes('gh') ||
      t.includes('club') ||
      t.includes('lm'));
  if (is200DpsDefending) return false;

  return (
    t.includes('180/dps') ||
    t.includes('200/dps') ||
    t.includes('world building guard') ||
    t.includes('damage wg') ||
    (t.includes('10 sec') && !t.includes('sec/')) ||
    t.includes('10/sec') ||
    t.includes('driving speed')
  );
};

export const isWorstSkill = (skill: string): boolean => {
  const t = (skill || '').toLowerCase();
  return (
    !isTerribleSkill(skill) &&
    (t.includes('gold brick gathering') ||
      (t.includes('fan capacity') && !t.includes('10% rally fan capacity')))
  );
};

export const isDirectDamage = (skill: string): boolean => {
  const t = (skill || '').toLowerCase();
  // Include 60% basic attack damage as BEST
  if (t.includes('60%') && t.includes('basic attack damage')) return true;
  // Include 30% skill damage as BEST
  if (t.includes('30%') && t.includes('skill damage')) return true;
  // Include 24% skill damage as BEST
  if (t.includes('24%') && t.includes('skill damage')) return true;
  // Direct damage: time-based or explicit damage that isn't a reduction/taken modifier and not the Good buffs
  const mentionsDamage = t.includes('damage') && !t.includes('reduc') && !t.includes('taken');
  const timeBased = t.includes(' sec/') || /\bsec\b/.test(t);
  return (
    (mentionsDamage || timeBased) &&
    !isGoodBuff(skill) &&
    !isWorstSkill(skill) &&
    !isTerribleSkill(skill)
  );
};

export const categorizeSkills = (skills: string[]) => {
  const terribleSkills = skills.filter(isTerribleSkill);
  const worstSkills = skills.filter(isWorstSkill);
  const bestSkills = skills.filter(isDirectDamage);
  const goodSkills = skills.filter(isGoodBuff);
  const okaySkills = skills.filter(
    (s) =>
      !bestSkills.includes(s) &&
      !goodSkills.includes(s) &&
      !worstSkills.includes(s) &&
      !terribleSkills.includes(s)
  );

  return {
    terribleSkills,
    worstSkills,
    bestSkills,
    goodSkills,
    okaySkills,
  };
};
