import { IStatus, IStatusEffect } from '../types';
import { ICON_ID } from './icon';

let id = 0;

export enum STATUS_ID {
  FLEXED = id++,
  PETRIFIED = id++,
  STONE_SKIN = id++,
  BURNED = id++,
  FROZEN = id++,
  SHOCKED = id++,
  BATTLE_FURY_1 = id++,
  BATTLE_FURY_2 = id++,
  BATTLE_FURY_3 = id++,
  BLOODLUST = id++,
  FOCUSED = id++,
  ENLIGHTENED = id++,
  WEAKENED = id++,
  DISABLED = id++,
  ENTANGLED = id++,
  HIDDEN = id++,
  SHIELDED = id++,
  SWIFTNESS = id++,
  BLEEDING = id++,
  DODGING = id++,
  POISONED = id++,
  WOUNDED = id++,
  BERSERK = id++,
  FRENZY = id++,
  DEFLECTING = id++,
  FIREBRANDED = id++,
  ICEBRANDED = id++,
  STORMBRANDED = id++,
  ARCANE_INTELLECT = id++,
}

export const BASE_STATUS_EFFECTS: IStatusEffect = {
  damageBonus: 0,
  incomingDamageReduction: 0,
  damageMultiplier: 1,
  damageOverTime: 0,
  strengthMultiplier: 1,
  intelligenceMultiplier: 1,
  defenseMultiplier: 1,
  lifesteal: 0,
  canMove: true,
  canAttack: true,
  hidden: false,
  movementRangeBonus: 0,
  dodgeChance: 0,
  damagePerAP: 0,
  incomingDamageMultiplier: 1,
  burnChance: 0,
  damageMultiplierForBurn: 1,
  freezeChance: 0,
  damageMultiplierForFreeze: 1,
  shockChance: 0,
  damageMultiplierForShock: 1,
  extraAPPerTurn: 0,
};

export const STATUSES: IStatus[] = [
  {
    id: STATUS_ID.FLEXED,
    name: 'Flexed',
    icon: ICON_ID.STATUS_ATTACK_UP,
    description: 'Increased strength by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.3,
    },
  },
  {
    id: STATUS_ID.PETRIFIED,
    name: 'Petrified',
    icon: ICON_ID.STATUS_PETRIFIED,
    description: 'Cannot move or attack.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      canMove: false,
      canAttack: false,
    },
  },
  {
    id: STATUS_ID.STONE_SKIN,
    name: 'Stone Skin',
    icon: ICON_ID.STATUS_DEFENSE_UP,
    description: 'Increased defense by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      defenseMultiplier: 1.3,
    },
  },
  {
    id: STATUS_ID.BURNED,
    name: 'Burned',
    icon: ICON_ID.STATUS_BURNED,
    description: 'Takes #DAMAGE damage at the start of the turn.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      damageOverTime: 1,
    },
  },
  {
    id: STATUS_ID.FROZEN,
    name: 'Frozen',
    icon: ICON_ID.STATUS_FROZEN,
    description: 'Cannot move or attack.',
    duration: 2,
    durationCounter: 2,
    effect: {
      ...BASE_STATUS_EFFECTS,
      canMove: false,
      canAttack: false,
    },
  },
  {
    id: STATUS_ID.SHOCKED,
    name: 'Shocked',
    icon: ICON_ID.STATUS_SHOCKED,
    description: 'Reduced AP per turn by 1.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
    },
  },
  {
    id: STATUS_ID.BATTLE_FURY_1,
    name: 'Battle Fury I',
    icon: ICON_ID.STATUS_BATTLE_FURY,
    description: 'Increased strength by 20%. Increased defense by 10%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.2,
      defenseMultiplier: 1.1,
    },
  },
  {
    id: STATUS_ID.BATTLE_FURY_2,
    name: 'Battle Fury II',
    icon: ICON_ID.STATUS_BATTLE_FURY,
    description: 'Increased strength by 40%. Increased defense by 20%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.4,
      defenseMultiplier: 1.2,
    },
  },
  {
    id: STATUS_ID.BATTLE_FURY_3,
    name: 'Battle Fury III',
    icon: ICON_ID.STATUS_BATTLE_FURY,
    description: 'Increased strength by 60%. Increased defense by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.6,
      defenseMultiplier: 1.3,
    },
  },
  {
    id: STATUS_ID.BLOODLUST,
    name: 'Bloodlust',
    icon: ICON_ID.STATUS_BLOODLUST,
    description: "Convert 50% of enemy health loss into caster's health.",
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      lifesteal: 0.5,
    },
  },
  {
    id: STATUS_ID.FOCUSED,
    name: 'Focused',
    icon: ICON_ID.STATUS_FOCUSED,
    description: 'Increased strength and intelligence by 20%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.2,
      intelligenceMultiplier: 1.2,
    },
  },
  {
    id: STATUS_ID.ENLIGHTENED,
    name: 'Enlightened',
    icon: ICON_ID.STATUS_ENLIGHTENED,
    description: 'Increased intelligence by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      intelligenceMultiplier: 1.3,
    },
  },
  {
    id: STATUS_ID.WEAKENED,
    name: 'Weakened',
    icon: ICON_ID.STATUS_WEAKENED,
    description: 'Decreased overall damage by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      damageMultiplier: 0.7,
    },
  },
  {
    id: STATUS_ID.DISABLED,
    name: 'Disabled',
    icon: ICON_ID.STATUS_DISABLED,
    description: 'Unable to attack and move.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      canAttack: false,
      canMove: false,
    },
  },
  {
    id: STATUS_ID.ENTANGLED,
    name: 'Entangled',
    icon: ICON_ID.STATUS_ENTANGLED,
    description: 'Unable to move.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      canMove: false,
    },
  },
  {
    id: STATUS_ID.HIDDEN,
    name: 'Hidden',
    icon: ICON_ID.STATUS_HIDDEN,
    description: 'Cannot be seen or targeted by enemies.',
    duration: 2,
    durationCounter: 2,
    effect: {
      ...BASE_STATUS_EFFECTS,
      hidden: true,
    },
  },
  {
    id: STATUS_ID.SHIELDED,
    name: 'Shielded',
    icon: ICON_ID.STATUS_SHIELDED,
    description: 'Gain additional hitpoints for the duration of the status',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      defenseMultiplier: 1.5,
    },
  },
  {
    id: STATUS_ID.SWIFTNESS,
    name: 'Swiftness',
    icon: ICON_ID.STATUS_SWIFTNESS,
    description: 'Increased movement range by 1.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      movementRangeBonus: 1,
    },
  },
  {
    id: STATUS_ID.BLEEDING,
    name: 'Bleeding',
    icon: ICON_ID.STATUS_BLEEDING,
    description: 'Takes #DAMAGE damage at the start of the turn.',
    duration: 1,
    durationCounter: 1,
    effect: {
      ...BASE_STATUS_EFFECTS,
      damageOverTime: 1,
    },
  },
  {
    id: STATUS_ID.DODGING,
    name: 'Dodging',
    icon: ICON_ID.STATUS_DODGING,
    description: 'Increased dodge chance by 50%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      dodgeChance: 0.5,
    },
  },
  {
    id: STATUS_ID.POISONED,
    name: 'Poisoned',
    icon: ICON_ID.STATUS_POISONED,
    description: 'Takes #DAMAGE damage at the start of the turn.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      damageOverTime: 1,
      damagePerAP: 1,
    },
  },
  {
    id: STATUS_ID.WOUNDED,
    name: 'Wounded',
    icon: ICON_ID.STATUS_WOUNDED,
    description:
      'Damage taken increased by 20%. If health is below 30%, damage taken increased by 40%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
    },
  },
  {
    id: STATUS_ID.BERSERK,
    name: 'Berserk',
    icon: ICON_ID.STATUS_BERSERK,
    description: 'Increased strength by #STRENGTH_MULTIPLIER%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.5,
    },
  },
  {
    id: STATUS_ID.FRENZY,
    name: 'Frenzy',
    icon: ICON_ID.STATUS_FRENZY,
    description: 'Increased strength by 60%. Decreased defense by 30%.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      strengthMultiplier: 1.6,
      defenseMultiplier: 0.7,
    },
  },
  {
    id: STATUS_ID.DEFLECTING,
    name: 'Deflecting',
    icon: ICON_ID.STATUS_DEFLECTING,
    description:
      'Reflect #DAMAGE_REDUCTION% of incoming damage back to the attacker.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      incomingDamageMultiplier: 0.5,
    },
  },
  {
    id: STATUS_ID.FIREBRANDED,
    name: 'Firebranded',
    icon: ICON_ID.STATUS_FIREBRANDED,
    description:
      'Damaging skills and attacks has #BURN_CHANCE% chance to burn. Increased damage by #DAMAGE_MULTIPLIER% on burning targets.',
    duration: 5,
    durationCounter: 5,
    effect: {
      ...BASE_STATUS_EFFECTS,
      burnChance: 0.5,
      damageMultiplierForBurn: 1.2,
    },
  },
  {
    id: STATUS_ID.ICEBRANDED,
    name: 'Icebranded',
    icon: ICON_ID.STATUS_ICEBRANDED,
    description:
      'Damaging skills and attacks has #FREEZE_CHANCE% chance to freeze. Increased damage by #DAMAGE_MULTIPLIER% on frozen targets.',
    duration: 5,
    durationCounter: 5,
    effect: {
      ...BASE_STATUS_EFFECTS,
      freezeChance: 0.5,
      damageMultiplierForFreeze: 1.2,
    },
  },
  {
    id: STATUS_ID.STORMBRANDED,
    name: 'Stormbranded',
    icon: ICON_ID.STATUS_STORMBRANDED,
    description:
      'Damaging skills and attacks has #SHOCK_CHANCE% chance to shock. Increased damage by #DAMAGE_MULTIPLIER% on shocked targets.',
    duration: 5,
    durationCounter: 5,
    effect: {
      ...BASE_STATUS_EFFECTS,
      shockChance: 0.5,
      damageMultiplierForShock: 1.2,
    },
  },
  {
    id: STATUS_ID.ARCANE_INTELLECT,
    name: 'Arcane Intellect',
    icon: ICON_ID.STATUS_ARCANE_INTELLECT,
    description: 'Increased intelligence by 30%. Increased AP per turn by 1.',
    duration: 3,
    durationCounter: 3,
    effect: {
      ...BASE_STATUS_EFFECTS,
      intelligenceMultiplier: 1.3,
      extraAPPerTurn: 1,
    },
  },
];
