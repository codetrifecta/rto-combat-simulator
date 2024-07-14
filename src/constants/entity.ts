import { IEnemy, IPlayer } from "../types";
import { SKILLS } from "./skill";
import { WEAPONS } from "./weapon";

export const STARTING_ACTION_POINTS = 4;

export const MAX_ACTION_POINTS = 6;

export enum ENTITY_TYPE {
  PLAYER = "player",
  ENEMY = "enemy",
}

export const PLAYER: IPlayer = {
  id: 1,
  name: "Kratos",
  entityType: ENTITY_TYPE.PLAYER,
  health: 10,
  maxHealth: 10,
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
    legging: null,
  },
};

export enum ENEMY_PRESET_ID {
  SHADE = 1,
  GORGON = 2,
  CYCLOPS = 3,
}

export const ENEMY_PRESETS: Record<ENEMY_PRESET_ID, IEnemy> = {
  [ENEMY_PRESET_ID.SHADE]: {
    id: 0,
    name: "Shade",
    entityType: ENTITY_TYPE.ENEMY,
    health: 3,
    maxHealth: 3,
    range: 1,
    damage: 2,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.GORGON]: {
    id: 0,
    name: "Gorgon",
    entityType: ENTITY_TYPE.ENEMY,
    health: 6,
    maxHealth: 6,
    range: 2,
    damage: 3,
    damageBonus: 0,
    statuses: [],
  },
  [ENEMY_PRESET_ID.CYCLOPS]: {
    id: 0,
    name: "Cyclops",
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 2,
    damage: 5,
    damageBonus: 0,
    statuses: [],
  },
};
