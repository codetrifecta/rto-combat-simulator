import { ISkill } from '../types';
import { ICON_ID } from './icons';

export enum SKILL_TYPE {
  SELF = 'self',
  ST = 'st',
  AOE = 'aoe',
}

export enum SKILL_ID {
  FLEX = 1,
  GORGONS_GAZE = 2,
  LIGHTNING = 3,
  FLY = 4,
  WHIRLWIND = 5,
  IRONFLESH = 6,
  FIREBALL = 7,
  FREEZE = 8,
  ABSORB = 9,
  EXECUTE = 10,
  CLEAVE = 11,
  ANNIHILATE = 12,
}

export const weaponBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
];

export const strengthBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.FLEX,
  SKILL_ID.IRONFLESH,
  SKILL_ID.WHIRLWIND,
  SKILL_ID.EXECUTE,
  SKILL_ID.CLEAVE,
  SKILL_ID.ANNIHILATE,
];

export const intelligenceBasedSkillIDs: SKILL_ID[] = [
  SKILL_ID.GORGONS_GAZE,
  SKILL_ID.LIGHTNING,
  SKILL_ID.FIREBALL,
  SKILL_ID.FREEZE,
  SKILL_ID.ABSORB,
];

export const SKILLS: ISkill[] = [
  {
    id: SKILL_ID.FLEX,
    name: 'Flex',
    icon: ICON_ID.SKILL_FLEX,
    skillType: SKILL_TYPE.SELF,
    description: 'Increase damage for all attacks by 2 for 3 turns.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.IRONFLESH,
    name: 'Ironflesh',
    icon: ICON_ID.SKILL_DEFENSE_UP,
    skillType: SKILL_TYPE.SELF,
    description:
      'Applies Stone Skin on self for 3 turns. Stone Skin decreases all incoming damage by 3.',
    damageMultiplier: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.GORGONS_GAZE,
    name: "Gorgon's Gaze",
    icon: ICON_ID.SKILL_PETRIFY,
    skillType: SKILL_TYPE.ST,
    description:
      'Petrify an enemy for 3 turns. Petrified enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 4,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.LIGHTNING,
    name: 'Lightning',
    icon: ICON_ID.SKILL_LIGHTNING,
    skillType: SKILL_TYPE.ST,
    description: 'Strike enemies with lighning from the skies.',
    damageMultiplier: 2,
    range: 3,
    cooldown: 1,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FIREBALL,
    name: 'Fireball',
    icon: ICON_ID.SKILL_FIREBALL,
    skillType: SKILL_TYPE.AOE,
    description: 'Launch a fireball at a target area. Burns enemies hit.',
    damageMultiplier: 1.5,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.WHIRLWIND,
    name: 'Whirlwind',
    icon: ICON_ID.SKILL_WHIRLWIND,
    skillType: SKILL_TYPE.AOE,
    description:
      "Spin around dealing damage to all adjacent enemies. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLY,
    name: 'Fly',
    icon: ICON_ID.SKILL_TELEPORT,
    skillType: SKILL_TYPE.ST,
    description: 'Fly to an empty tile in the room.',
    damageMultiplier: 0,
    range: 5,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.FREEZE,
    name: 'Freeze',
    icon: ICON_ID.SKILL_FREEZE,
    skillType: SKILL_TYPE.ST,
    description:
      'Freeze an enemy for 2 turns. Frozen enemies cannot move or attack.',
    damageMultiplier: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.ABSORB,
    name: 'Absorb',
    icon: ICON_ID.SKILL_ABSORB,
    skillType: SKILL_TYPE.ST,
    description:
      "Absorb an enemy's life force. Damage dealt is converted to health.",
    damageMultiplier: 0.5,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.EXECUTE,
    name: 'Execute',
    icon: ICON_ID.SKILL_EXECUTE,
    skillType: SKILL_TYPE.ST,
    description:
      "Execute an enemy with low health. Deals 2x damage to enemies with less than 25% health. If the enemy is executed, the player gains 2 AP. Range is dependent on the player's current weapon.",
    damageMultiplier: 1,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.CLEAVE,
    name: 'Cleave',
    icon: ICON_ID.SKILL_CLEAVE,
    skillType: SKILL_TYPE.AOE,
    description:
      "Cleave through enemies in front of you. Range is dependent on the player's current weapon.",
    damageMultiplier: 1.5,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 3,
  },
  {
    id: SKILL_ID.ANNIHILATE,
    name: 'Annihilate',
    icon: ICON_ID.SKILL_ANNIHILATE,
    skillType: SKILL_TYPE.ST,
    description:
      'As you brace yourself, swing with all your might to deal a devastating blow to an enemy. Range is dependent on the player’s current weapon.',
    damageMultiplier: 3,
    range: 1,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 5,
  },
];
