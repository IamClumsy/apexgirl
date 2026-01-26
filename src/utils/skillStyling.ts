// Skill badge styling utilities

export const getSkillClass = (skill: string): string => {
  if (!skill) return 'bg-blue-500 text-white';
  const trimmed = skill.trim();
  if (trimmed.toLowerCase().includes('damage to player'))
    return 'damage-to-player bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg';
  if (trimmed === '60% Basic Attack Damage')
    return 'basic-attack-60 bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg';
  if (trimmed === '24% Skill Damage')
    return 'basic-attack-60 bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg';
  if (trimmed === '30% Skill Damage')
    return 'basic-attack-60 bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg';
  if (trimmed === '50% Basic Attack Damage')
    return 'basic-attack-50 bg-gradient-to-r from-slate-700 to-slate-800 shadow-sm';
  if (trimmed.includes('Gold Brick'))
    return 'bg-gradient-to-r from-slate-600 to-slate-700 text-orange-500 border border-slate-500/40 gold-text';
  if (trimmed.includes('Reduction Basic Attack Damage'))
    return 'bg-gradient-to-r from-slate-600 to-slate-700 text-blue-500 border border-slate-500/40 blue-text';
  if (
    [
      '180/DPS Attacking Group Center, Club, Landmark',
      '30% Damage World Building Guard',
      '36% Damage to World Building Guard',
      '180/DPS Attacking Enemy Company',
      '20% Damage WG / 50% Drive Speed',
      '75% Drive Speed',
    ].includes(trimmed)
  )
    return 'skill-specific-terrible bg-gradient-to-r from-slate-600 to-slate-700 shadow-sm border border-red-500/40';
  if (['20% Skill Damage', '12% Skill Damage Reduction'].includes(trimmed)) {
    return trimmed === '20% Skill Damage'
      ? 'skill-damage-20 bg-gradient-to-r from-emerald-400 to-green-600 shadow-sm'
      : 'bg-gradient-to-r from-slate-600 to-slate-700 text-blue-500 border border-slate-500/40 blue-text';
  }
  return 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 border border-slate-500/40';
};
