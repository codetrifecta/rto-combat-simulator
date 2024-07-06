import { ISkill, IStatus } from "./types";

export const TILE_SIZE = 45; // Default to 50

export const ROOM_LENGTH = 11; // Default to 11

export enum TILE_TYPE {
  EMPTY = 0,
  WALL = 1,
  DOOR = 2,
  PLAYER = 3,
  ENEMY = 4,
}

export enum ENTITY_TYPE {
  PLAYER = "player",
  ENEMY = "enemy",
}

export const STARTING_ACTION_POINTS = 4;
export const MAX_ACTION_POINTS = 6;

export enum SKILL_TYPE {
  SELF = "self",
  ST = "st",
  AOE = "aoe",
}

export enum SKILL_ID {
  BUFF_UP = 1,
  GORGONS_GAZE = 2,
  LIGHTNING = 3,
}

export const SKILLS: ISkill[] = [
  {
    id: SKILL_ID.BUFF_UP,
    name: "Buff Up",
    skillType: SKILL_TYPE.SELF,
    description: "Increase damage for all attacks by 2 for 3 turns.",
    damage: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.GORGONS_GAZE,
    name: "Gorgon's Gaze",
    skillType: SKILL_TYPE.ST,
    description:
      "Petrify an enemy for 3 turns. Petrified enemies cannot move or attack.",
    damage: 0,
    range: 3,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.LIGHTNING,
    name: "Lightning",
    skillType: SKILL_TYPE.ST,
    description: "Strike lightning dealing damage from the skies.",
    damage: 3,
    range: 3,
    cooldown: 1,
    cooldownCounter: 0,
    cost: 2,
  },
];

export const STATUS_ID = {
  BUFFED: 1,
  PETRIFIED: 2,
};

export const STATUSES: IStatus[] = [
  {
    id: STATUS_ID.BUFFED,
    name: "Buffed",
    description: "Increased damage for all attacks by 2 for 3 turns.",
    duration: 3,
    durationCounter: 3,
    effect: {
      damageBonus: 2,
      canMove: true,
      canAttack: true,
    },
  },
  {
    id: STATUS_ID.PETRIFIED,
    name: "Petrified",
    description: "Cannot move or attack for 3 turns.",
    duration: 3,
    durationCounter: 3,
    effect: {
      damageBonus: 0,
      canMove: false,
      canAttack: false,
    },
  },
];
