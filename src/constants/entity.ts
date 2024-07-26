import { IEnemy, IPlayer } from '../types';
import { LEGGINGS } from './armor';
import { SKILLS } from './skill';
import { SPRITE_ID } from './sprite';
import { WEAPONS } from './weapon';

export const STARTING_ACTION_POINTS = 4;

export const MAX_ACTION_POINTS = 6;

export enum ENTITY_TYPE {
  PLAYER = 'player',
  ENEMY = 'enemy',
}

export const PLAYER: IPlayer = {
  id: 1,
  name: 'Kratos',
  entityType: ENTITY_TYPE.PLAYER,
  health: 20,
  maxHealth: 20,
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
};

export enum ENEMY_PRESET_ID {
  SHADE = 1,
  GORGON = 2,
  CYCLOPS = 3,
  HARPY = 4,
  MINOTAUR = 5,
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
  [ENEMY_PRESET_ID.CYCLOPS]: {
    id: 0,
    name: 'Cyclops',
    sprite: SPRITE_ID.DEMON_10,
    sprite_size: 48,
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
    sprite: SPRITE_ID.DEMON_12,
    sprite_size: 64,
    entityType: ENTITY_TYPE.ENEMY,
    health: 50,
    maxHealth: 50,
    range: 1,
    damage: 10,
    damageBonus: 0,
    statuses: [],
  },
};
