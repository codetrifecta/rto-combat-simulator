import { IEnemy, IPlayer } from '../types';
import { getPlayerMaxHealth } from '../utils';
import { LEGGINGS } from './armor';
import { SKILL_ID, SKILLS } from './skill';
import { SPRITE_ID } from './sprite';
import { WEAPONS } from './weapon';

export const STARTING_ACTION_POINTS = 4;

export const MAX_ACTION_POINTS = 6;

export enum ENTITY_TYPE {
  PLAYER = 'player',
  ENEMY = 'enemy',
}

export const STARTING_MAX_HEALTH = 25;

export const PLAYER: IPlayer = {
  id: 1,
  name: 'Kratos',
  sprite: SPRITE_ID.PLAYER_01,
  sprite_size: 64,
  entityType: ENTITY_TYPE.PLAYER,
  health: 1,
  maxHealth: 1,
  damageBonus: 0,
  actionPoints: STARTING_ACTION_POINTS,
  skills: SKILLS,
  statuses: [],
  state: {
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  },
  equipment: {
    weapon: WEAPONS.find((weapon) => weapon.id === 1) || null,
    helmet: null,
    chestpiece: null,
    legging: LEGGINGS.find((legging) => legging.id === 1) || null,
  },
  healthPotions: 2,
};

export const getDefaultPlayer = (): IPlayer => {
  return {
    ...PLAYER,
    health: getPlayerMaxHealth(PLAYER),
    maxHealth: getPlayerMaxHealth(PLAYER),
    skills: SKILLS.filter((skill) =>
      [SKILL_ID.FOCUS, SKILL_ID.CLEAVE, SKILL_ID.FIREBALL].includes(skill.id)
    ),
  };
};

let id = 1;

export enum ENEMY_PRESET_ID {
  SHADE = id++,
  GORGON = id++,
  SKYWARD_TITAN = id++,
  HARPY = id++,
  MINOTAUR = id++,
  FLAMING_SKULL_A = id++,
}

export const ENEMY_PRESETS: Record<ENEMY_PRESET_ID, IEnemy> = {
  [ENEMY_PRESET_ID.SHADE]: {
    id: 0,
    name: 'Shade',
    sprite: SPRITE_ID.DEMON_10,
    sprite_size: 32,
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 1,
    damage: 4,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.GORGON]: {
    id: 0,
    name: 'Gorgon',
    sprite: SPRITE_ID.DEMON_10,
    sprite_size: 32,
    entityType: ENTITY_TYPE.ENEMY,
    health: 20,
    maxHealth: 20,
    range: 2,
    damage: 6,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.SKYWARD_TITAN]: {
    id: 0,
    name: 'Skyward Titan',
    sprite: SPRITE_ID.ENEMY_SKYWARD_TITAN,
    sprite_size: 96,
    entityType: ENTITY_TYPE.ENEMY,
    health: 40,
    maxHealth: 40,
    range: 2,
    damage: 10,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.HARPY]: {
    id: 0,
    name: 'Harpy',
    sprite: SPRITE_ID.DEMON_02,
    sprite_size: 48,
    entityType: ENTITY_TYPE.ENEMY,
    health: 30,
    maxHealth: 30,
    range: 2,
    damage: 8,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.MINOTAUR]: {
    id: 0,
    name: 'Minotaur',
    sprite: SPRITE_ID.ENEMY_017_B,
    sprite_size: 115,
    entityType: ENTITY_TYPE.ENEMY,
    health: 50,
    maxHealth: 50,
    range: 1,
    damage: 10,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.FLAMING_SKULL_A]: {
    id: 0,
    name: 'Flaming Skull',
    sprite: SPRITE_ID.ENEMY_008_A,
    sprite_size: 64,
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 1,
    damage: 5,
    damageBonus: 0,
    statuses: [],
  },
};
