import { ISkill, IStatus, IWeapon } from "./types";

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
  TELEPORT = 4,
  WHIRLWIND = 5,
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
    description: "Strike enemies with lighning from the skies.",
    damage: 3,
    range: 3,
    cooldown: 1,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.TELEPORT,
    name: "Teleport",
    skillType: SKILL_TYPE.ST,
    description: "Teleport to an empty tile in the room.",
    damage: 0,
    range: 4,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
  {
    id: SKILL_ID.WHIRLWIND,
    name: "Whirlwind",
    skillType: SKILL_TYPE.AOE,
    description:
      "Spin around dealing damage to all adjacent enemies. Damage and range is dependent on the player's current weapon.",
    damage: 1,
    range: 1,
    cooldown: 3,
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

export const WEAPONS: IWeapon[] = [
  {
    id: 1,
    name: "Fists",
    damage: 1,
    range: 1,
    cost: 1,
  },
  {
    id: 2,
    name: "Club",
    damage: 2,
    range: 1,
    cost: 1,
  },
  {
    id: 3,
    name: "Greatsword",
    damage: 3,
    range: 2,
    cost: 2,
  },
  {
    id: 4,
    name: "Bow",
    damage: 2,
    range: 4,
    cost: 2,
  },
  {
    id: 5,
    name: "Magic Staff",
    damage: 1,
    range: 3,
    cost: 1,
  },
  {
    id: 6,
    name: "Test Hammer of Doom",
    damage: 100,
    range: 100,
    cost: 1,
  },
];
