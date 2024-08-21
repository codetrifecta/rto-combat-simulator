import { ISkill } from '../types';
import { ICON_ID } from './icon';

export enum SKILL_TYPE {
  SELF = 'self',
  ST = 'st',
  AOE = 'aoe',
}
export enum SKILL_TAG {
  SELF = 'self',
  SINGLE_TARGET = 'single_target',
  AOE = 'aoe',
  DAMAGE = 'damage',
  STATUS = 'status',
  MOVEMENT = 'movement',
}

let id = 1;

export enum SKILL_ID {
  FLEX = id++,
  GORGONS_GAZE = id++,
  LIGHTNING = id++,
  FLY = id++,
  WHIRLWIND = id++,
  IRONFLESH = id++,
  FIREBALL = id++,
  FREEZE = id++,
  ABSORB = id++,
  EXECUTE = id++,
  CLEAVE = id++,
  ANNIHILATE = id++,
  WARCRY = id++,
  BLOODLUST = id++,
  FOCUS = id++,
  ENLIGHTEN = id++,
  WEAKEN = id++,
  DISABLE = id++,
  ENTANGLE = id++,
  LEAP_SLAM = id++,
  FLAME_DIVE = id++,
  HIDE = id++,
  HIDDEN_BLADE = id++,
  SWIFT_MOVEMENT = id++,
  THROWING_KNIVES = id++,
}

export const weaponBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
];

export const strengthBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
  SKILL_ID.LEAP_SLAM,
  SKILL_ID.HIDDEN_BLADE,
  SKILL_ID.THROWING_KNIVES,
];

export const intelligenceBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.LIGHTNING,
  SKILL_ID.FIREBALL,
  SKILL_ID.FREEZE,
  SKILL_ID.ABSORB,
  SKILL_ID.FLAME_DIVE,
];

export const SKILLS: ISkill[] = [
  // Strength-based skills
  {
    id: SKILL_ID.CLEAVE,
    name: 'Cleave',
    icon: ICON_ID.SKILL_CLEAVE,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      "Cleave through enemies in front of you. Range is dependent on the player's current weapon.",
    damageMultiplier: 1.5,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WHIRLWIND,
    name: 'Whirlwind',
    icon: ICON_ID.SKILL_WHIRLWIND,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE],
    description:
      "Spin around dealing damage to all adjacent enemies. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.EXECUTE,
    name: 'Execute',
    icon: ICON_ID.SKILL_EXECUTE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      "Execute an enemy with low health. Deals 2x damage to enemies with less than 25% health. If the enemy is executed, the player gains 2 AP. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ANNIHILATE,
    name: 'Annihilate',
    icon: ICON_ID.SKILL_ANNIHILATE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      'As you brace yourself, swing with all your might to deal a devastating blow to an enemy. Range is dependent on the player’s current weapon.',
    damageMultiplier: 3,
    range: 1,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 5,
  },
  {
    id: SKILL_ID.HIDDEN_BLADE,
    name: 'Shadow Strike',
    icon: ICON_ID.SKILL_HIDDEN_BLADE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Deal critical damage to an enemy. Damage is doubled if used when hidden. Deal bleeding to an enemy for 1 turns.',
    damageMultiplier: 1.2,
    range: 1,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.THROWING_KNIVES,
    name: 'Throwing Knives',
    icon: ICON_ID.SKILL_THROWING_KNIVES,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Throw a barrage of knives in all directions, dealing your normal amount of damage. 15% chance of dealing 100% more of base damage (critical hit) for each enemy. And deal bleeding to them for 1 turn.',
    damageMultiplier: 1,
    range: 4,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },

  // Intelligence-based skills
  {
    id: SKILL_ID.LIGHTNING,
    name: 'Lightning',
    icon: ICON_ID.SKILL_LIGHTNING,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description: 'Strike enemies with lighning from the skies.',
    damageMultiplier: 2,
    range: 4,
    cooldown: 1,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FIREBALL,
    name: 'Fireball',
    icon: ICON_ID.SKILL_FIREBALL,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.STATUS],
    description:
      'Launch a fireball at a target area. Additionally applied Burned to enemies hit for 3 turns.',
    damageMultiplier: 1.5,
    range: 4,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ABSORB,
    name: 'Absorb',
    icon: ICON_ID.SKILL_ABSORB,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.DAMAGE],
    description:
      "Absorb an enemy's life force. Enemy health lost is converted to caster's health.",
    damageMultiplier: 0.5,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },

  // Self-targeted skills
  {
    id: SKILL_ID.FLEX,
    name: 'Flex',
    icon: ICON_ID.SKILL_FLEX,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Applies Flexed on self for 3 turns. Flexed increases strength by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.IRONFLESH,
    name: 'Ironflesh',
    icon: ICON_ID.SKILL_DEFENSE_UP,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Applies Stone Skin on self for 3 turns. Stone Skin increases defense by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.WARCRY,
    name: 'Warcry',
    icon: ICON_ID.SKILL_WARCRY,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.STATUS],
    description:
      "Unleash a warcry to boost your courage. Gain Battle Fury for 3 turns. Battle Fury's efffects stacks with the amount of enemies in range",
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.BLOODLUST,
    name: 'Bloodlust',
    icon: ICON_ID.SKILL_BLOODLUST,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description: 'Enter a state of Bloodlust for 3 turns.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FOCUS,
    name: 'Focus',
    icon: ICON_ID.SKILL_FOCUS,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain Focused for 3 turns. Focused increases strength and intelligence by 15%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.ENLIGHTEN,
    name: 'Enlighten',
    icon: ICON_ID.SKILL_ENLIGHTEN,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Gain Enlightened for 3 turns. Enlightened increases intelligence by 30%.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.HIDE,
    name: 'Hide',
    icon: ICON_ID.SKILL_HIDE,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Become hidden to enemies, stopping them from seeing and attacking you for 2 turns.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.SWIFT_MOVEMENT,
    name: 'Swift Movement',
    icon: ICON_ID.SKILL_SWIFT_MOVEMENT,
    skillType: SKILL_TYPE.SELF,
    tags: [SKILL_TAG.SELF, SKILL_TAG.STATUS],
    description:
      'Applies swiftness for 2 turns. Use 1 AP to move 3 tiles instead of 2. Gain 1 additional AP per turn for the duration',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 1,
  },

  // Debuff skills
  {
    id: SKILL_ID.GORGONS_GAZE,
    name: "Gorgon's Gaze",
    icon: ICON_ID.SKILL_PETRIFY,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Petrify an enemy for 3 turns. Petrified enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 4,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FREEZE,
    name: 'Freeze',
    icon: ICON_ID.SKILL_FREEZE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Freeze an enemy for 2 turns. Frozen enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WEAKEN,
    name: 'Weaken',
    icon: ICON_ID.SKILL_WEAKEN,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Weaken an enemy for 3 turns. Weakened enemies deal 30% less damage.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.DISABLE,
    name: 'Disable',
    icon: ICON_ID.SKILL_DISABLE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Disable an enemy for 3 turns. Disabled enemies cannot attack.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ENTANGLE,
    name: 'Entangle',
    icon: ICON_ID.SKILL_ENTANGLE,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.SINGLE_TARGET, SKILL_TAG.STATUS],
    description:
      'Entangle an enemy for 3 turns. Entangled enemies cannot move.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },

  // Movement skills
  {
    id: SKILL_ID.FLY,
    name: 'Fly',
    icon: ICON_ID.SKILL_FLY,
    skillType: SKILL_TYPE.ST,
    tags: [SKILL_TAG.MOVEMENT],
    description: 'Fly to an empty tile in the room.',
    damageMultiplier: 0,
    range: 6,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.LEAP_SLAM,
    name: 'Leap Slam',
    icon: ICON_ID.SKILL_LEAP_SLAM,
    skillType: SKILL_TYPE.AOE,
    tags: [SKILL_TAG.AOE, SKILL_TAG.DAMAGE, SKILL_TAG.MOVEMENT],
    description:
      'Leap slam to a location and deal damage around your landing position.',
    damageMultiplier: 0.8,
    range: 4,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLAME_DIVE,
    name: 'Flame Dive',
    icon: ICON_ID.SKILL_FLAME_DIVE,
    skillType: SKILL_TYPE.AOE,
    tags: [
      SKILL_TAG.AOE,
      SKILL_TAG.DAMAGE,
      SKILL_TAG.STATUS,
      SKILL_TAG.MOVEMENT,
    ],
    description:
      'Dive to a location and deal damage to enemies around your landing position. Additionally applies Burned to enemies hit for 3 turns.',
    damageMultiplier: 0.5,
    range: 5,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
];

export const selfTargetedSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.SELF)
).map((skill) => skill.id);

export const singleTargetSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.SINGLE_TARGET)
).map((skill) => skill.id);

export const aoeSkillIDs: SKILL_ID[] = SKILLS.filter((skill) =>
  skill.tags.some((tag) => tag === SKILL_TAG.AOE)
).map((skill) => skill.id);
