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
  IRONFLESH = 6,
  FIREBALL = 7,
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
    id: SKILL_ID.IRONFLESH,
    name: "Ironflesh",
    skillType: SKILL_TYPE.SELF,
    description:
      "Applies Stone Skin on self for 3 turns. Stone Skin decreases all incoming damage by 3.",
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
    id: SKILL_ID.FIREBALL,
    name: "Fireball",
    skillType: SKILL_TYPE.AOE,
    description: "Launch a fireball at a target area. Burns enemies hit.",
    damage: 2,
    range: 3,
    cooldown: 2,
    cooldownCounter: 0,
    cost: 2,
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
];

export const STATUS_ID = {
  BUFFED: 1,
  PETRIFIED: 2,
  STONE_SKIN: 3,
  BURNED: 4,
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
      incomingDamageReduction: 0,
      damageOverTime: 0,
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
      incomingDamageReduction: 0,
      damageOverTime: 0,
      canMove: false,
      canAttack: false,
    },
  },
  {
    id: STATUS_ID.STONE_SKIN,
    name: "Stone Skin",
    description: "Decreases all incoming damage by 3 for 3 turns.",
    duration: 3,
    durationCounter: 3,
    effect: {
      damageBonus: 0,
      incomingDamageReduction: 3,
      damageOverTime: 0,
      canMove: true,
      canAttack: true,
    },
  },
  {
    id: STATUS_ID.BURNED,
    name: "Burned",
    description: "Takes 1 damage at the start of the turn for 3 turns.",
    duration: 3,
    durationCounter: 3,
    effect: {
      damageBonus: 0,
      incomingDamageReduction: 0,
      damageOverTime: 1,
      canMove: true,
      canAttack: true,
    },
  },
];

export enum WEAPON_TYPE {
  MELEE = "melee",
  RANGED = "ranged",
}

export const WEAPONS: IWeapon[] = [
  {
    id: 1,
    name: "Fists",
    type: WEAPON_TYPE.MELEE,
    damage: 1,
    range: 1,
    cost: 1,
  },
  {
    id: 2,
    name: "Club",
    type: WEAPON_TYPE.MELEE,
    damage: 2,
    range: 1,
    cost: 1,
  },
  {
    id: 3,
    name: "Greatsword",
    type: WEAPON_TYPE.MELEE,
    damage: 3,
    range: 2,
    cost: 2,
  },
  {
    id: 4,
    name: "Bow",
    type: WEAPON_TYPE.RANGED,
    damage: 2,
    range: 4,
    cost: 2,
  },
  {
    id: 5,
    name: "Magic Staff",
    type: WEAPON_TYPE.RANGED,
    damage: 1,
    range: 3,
    cost: 1,
  },
  {
    id: 6,
    name: "Test Hammer of Doom",
    type: WEAPON_TYPE.MELEE,
    damage: 100,
    range: 100,
    cost: 1,
  },
];
