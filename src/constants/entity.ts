import { IEnemy, IEntity, IPlayer, ISummon } from '../types';
import { getPlayerMaxHealth } from '../utils/entity';
import { LEGGINGS } from './armor';
import { SKILL_ID, SKILLS } from './skill';
import { SPRITE_ID } from './sprite';
import { WEAPONS } from './weapon';

export const STARTING_ACTION_POINTS = 4;

export const MAX_ACTION_POINTS = 6;

export enum ENTITY_TYPE {
  PLAYER = 'player',
  ENEMY = 'enemy',
  SUMMON = 'summon',
}

export enum ENTITY_SPRITE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

export const DEFAULT_MOVEMENT_RANGE = 2;

export const STARTING_MAX_HEALTH = 25;

export const BASE_ENTITY: IEntity = {
  id: 0,
  name: '',
  entityType: ENTITY_TYPE.PLAYER,
  health: 0,
  maxHealth: 0,
  statuses: [],
  damageBonus: 0,
  movementRange: DEFAULT_MOVEMENT_RANGE,
  sprite: SPRITE_ID.PLAYER_01,
  spriteSize: 64,
  spritesheetRows: 12,
  spritesheetColumns: 6,
  spritesheetIdleRow: 0,
  spritesheetMovementRow: 1,
  spritesheetAttackRow: 2,
  spritesheetDamagedRow: 8,
  spritesheetDefeatRow: 9,
};

export const PLAYER: IPlayer = {
  ...BASE_ENTITY,
  id: 1,
  name: 'Kratos',
  sprite: SPRITE_ID.PLAYER_01,
  spriteSize: 64,
  spritesheetRows: 12,
  spritesheetColumns: 6,
  spritesheetIdleRow: 0,
  spritesheetMovementRow: 1,
  spritesheetAttackRow: 2,
  spritesheetDamagedRow: 8,
  spritesheetDefeatRow: 9,
  entityType: ENTITY_TYPE.PLAYER,
  health: 1,
  maxHealth: 1,
  damageBonus: 0,
  actionPoints: STARTING_ACTION_POINTS,
  movementRange: 2,
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
    // health: 5,
    maxHealth: getPlayerMaxHealth(PLAYER),
    // actionPoints: MAX_ACTION_POINTS,
    skills: SKILLS.filter((skill) =>
      [
        SKILL_ID.EXECUTE,
        SKILL_ID.AIR_SLASH,
        SKILL_ID.FOCUS,
        SKILL_ID.STORMBRAND,
        SKILL_ID.STORM_PULSE,
        SKILL_ID.LEAP_SLAM,
      ].includes(skill.id)
    ),
  };
};

let id = 1;

export enum SUMMON_PRESET_ID {
  CLONE = id++,
}

export const SUMMON_PRESETS: Record<SUMMON_PRESET_ID, ISummon> = {
  [SUMMON_PRESET_ID.CLONE]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Clone',
    sprite: SPRITE_ID.PLAYER_01,
    spriteSize: 64,
    spritesheetRows: 12,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 8,
    spritesheetDefeatRow: 9,
    entityType: ENTITY_TYPE.SUMMON,
    health: 1,
    maxHealth: 1,
    damageBonus: 0,
    statuses: [],
    owner: getDefaultPlayer(),
    ownerId: 1,
  },
};

export enum ENEMY_PRESET_ID {
  ABYSSAL_CYCLOPEAN_WRAITH = id++,
  CERBERUS_PUP = id++,
  CORRUPT_MINOTAUR = id++,
  CORRUPT_OLYMPIAN = id++,
  EREBUS_FIEND = id++,
  INFERNAL_MINOTAUR = id++,
  MYRMIDON_HOUND = id++,
  SKYWARD_TITAN = id++,
  STYGIAN_WRAITH = id++,
  TARTARIAN_HOUND = id++,
  TARTARIAN_LYCAN = id++,
  SHADE = id++,
  GORGON = id++,
  HARPY = id++,
  // MINOTAUR = id++,
  // FLAMING_SKULL_A = id++,
}

export const ENEMY_PRESETS: Record<ENEMY_PRESET_ID, IEnemy> = {
  [ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Abyssal Cyclopean Wraith',
    sprite: SPRITE_ID.ENEMY_ABYSSAL_CYCLOPEAN_WRAITH,
    spriteSize: 90,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 20,
    maxHealth: 20,
    range: 2,
    damage: 5,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.CERBERUS_PUP]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Cerberus Pup',
    sprite: SPRITE_ID.CERBERUS_PUP,
    spriteSize: 64,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 1,
    damage: 3,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.CORRUPT_MINOTAUR]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Corrupt Minotaur',
    sprite: SPRITE_ID.CORRUPT_MINOTAUR,
    spriteSize: 130,
    spritesheetRows: 6,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 4,
    spritesheetDefeatRow: 5,
    entityType: ENTITY_TYPE.ENEMY,
    health: 30,
    maxHealth: 30,
    range: 1,
    damage: 8,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.CORRUPT_OLYMPIAN]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Corrupt Olympian',
    sprite: SPRITE_ID.CORRUPT_OLYMPIAN,
    spriteSize: 130,
    spritesheetRows: 9,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 7,
    spritesheetDefeatRow: 8,
    entityType: ENTITY_TYPE.ENEMY,
    health: 25,
    maxHealth: 25,
    range: 2,
    damage: 6,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.EREBUS_FIEND]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Erebus Fiend',
    sprite: SPRITE_ID.EREBUS_FIEND,
    spriteSize: 100,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 4,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 15,
    maxHealth: 15,
    range: 1,
    damage: 5,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.INFERNAL_MINOTAUR]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Infernal Minotaur',
    sprite: SPRITE_ID.INFERNAL_MINOTAUR,
    spriteSize: 130,
    spritesheetRows: 6,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 4,
    spritesheetDefeatRow: 5,
    entityType: ENTITY_TYPE.ENEMY,
    health: 40,
    maxHealth: 40,
    range: 1,
    damage: 10,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.MYRMIDON_HOUND]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Myrmidon Hound',
    sprite: SPRITE_ID.MYRMIDON_HOUND,
    spriteSize: 130,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 3,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 20,
    maxHealth: 20,
    range: 1,
    damage: 6,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.SKYWARD_TITAN]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Skyward Titan',
    sprite: SPRITE_ID.ENEMY_SKYWARD_TITAN,
    spriteSize: 100,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 40,
    maxHealth: 40,
    range: 2,
    damage: 10,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.STYGIAN_WRAITH]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Stygian Wraith',
    sprite: SPRITE_ID.STYGIAN_WRAITH,
    spriteSize: 64,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 2,
    damage: 8,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.TARTARIAN_HOUND]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Tartarian Hound',
    sprite: SPRITE_ID.TARTARIAN_HOUND,
    spriteSize: 130,
    spritesheetRows: 9,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 3,
    spritesheetDamagedRow: 7,
    spritesheetDefeatRow: 8,
    entityType: ENTITY_TYPE.ENEMY,
    health: 20,
    maxHealth: 20,
    range: 1,
    damage: 6,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.TARTARIAN_LYCAN]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Tartarian Lycan',
    sprite: SPRITE_ID.TARTARIAN_LYCAN,
    spriteSize: 130,
    spritesheetRows: 8,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 5,
    spritesheetDamagedRow: 6,
    spritesheetDefeatRow: 7,
    entityType: ENTITY_TYPE.ENEMY,
    health: 30,
    maxHealth: 30,
    range: 1,
    damage: 8,
    damageBonus: 0,
    statuses: [],
  },
  // [ENEMY_PRESET_ID.MINOTAUR]: {
  //   id: 0,
  //   name: 'Minotaur',
  //   sprite: SPRITE_ID.ENEMY_017_B,
  //   spriteSize: 115,
  //   entityType: ENTITY_TYPE.ENEMY,
  //   health: 50,
  //   maxHealth: 50,
  //   range: 1,
  //   damage: 10,
  //   damageBonus: 0,
  //   statuses: [],
  // },
  // [ENEMY_PRESET_ID.FLAMING_SKULL_A]: {
  //   id: 0,
  //   name: 'Flaming Skull',
  //   sprite: SPRITE_ID.ENEMY_008_A,
  //   spriteSize: 64,
  //   entityType: ENTITY_TYPE.ENEMY,
  //   health: 10,
  //   maxHealth: 10,
  //   range: 1,
  //   damage: 5,
  //   damageBonus: 0,
  //   statuses: [],
  // },
};
