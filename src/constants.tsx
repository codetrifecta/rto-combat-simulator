import { IEnemy, ISkill, IStatus, IWeapon } from "./types";

export const TILE_SIZE = 50; // Default to 50

export const ROOM_LENGTH = 11; // Default to 11

export enum TILE_TYPE {
  NULL = -1,
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

export const STARTING_ACTION_POINTS = 4;
export const MAX_ACTION_POINTS = 6;

export enum SKILL_TYPE {
  SELF = "self",
  ST = "st",
  AOE = "aoe",
}

export enum SKILL_ID {
  FLEX = 1,
  GORGONS_GAZE = 2,
  LIGHTNING = 3,
  FLY = 4,
  WHIRLWIND = 5,
  IRONFLESH = 6,
  FIREBALL = 7,
}

export const SKILLS: ISkill[] = [
  {
    id: SKILL_ID.FLEX,
    name: "Flex",
    skillType: SKILL_TYPE.SELF,
    description: "Increase damage for all attacks by 2 for 3 turns.",
    damageMultiplier: 0,
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
    damageMultiplier: 0,
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
    damageMultiplier: 0,
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
    damageMultiplier: 2,
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
    damageMultiplier: 1.5,
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
    damageMultiplier: 2,
    range: 1,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
  },
  {
    id: SKILL_ID.FLY,
    name: "Fly",
    skillType: SKILL_TYPE.ST,
    description: "Fly to an empty tile in the room.",
    damageMultiplier: 0,
    range: 5,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
];

export const STATUS_ID = {
  FLEXED: 1,
  PETRIFIED: 2,
  STONE_SKIN: 3,
  BURNED: 4,
};

export const STATUSES: IStatus[] = [
  {
    id: STATUS_ID.FLEXED,
    name: "Flexed",
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

export enum WEAPON_ATTACK_TYPE {
  MELEE = "melee",
  RANGED = "ranged",
}

export enum WEAPON_TYPE {
  ONE_HANDED = "one-handed",
  TWO_HANDED = "two-handed",
  BOW = "bow",
  WAND = "wand",
  STAFF = "staff",
}

export const WEAPONS: IWeapon[] = [
  {
    id: 1,
    name: "Fists",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
    stats: {
      strength: 1,
      intelligence: 0,
      defense: 0,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 2,
    name: "Club",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
    stats: {
      strength: 2,
      intelligence: 0,
      defense: 0,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 3,
    name: "Blade of Olympus",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.TWO_HANDED,
    stats: {
      strength: 5,
      intelligence: 3,
      defense: 0,
      constitution: 0,
    },
    range: 2,
    cost: 2,
  },
  {
    id: 4,
    name: "Blades of Chaos",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
    stats: {
      strength: 2,
      intelligence: 1,
      defense: 0,
      constitution: 0,
    },
    range: 3,
    cost: 1,
  },
  {
    id: 5,
    name: "Bow",
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.BOW,
    stats: {
      strength: 2,
      intelligence: 0,
      defense: 0,
      constitution: 0,
    },
    range: 4,
    cost: 2,
  },
  {
    id: 6,
    name: "Magic Staff",
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.STAFF,
    stats: {
      strength: 0,
      intelligence: 3,
      defense: 0,
      constitution: 0,
    },
    range: 3,
    cost: 1,
  },
  {
    id: 7,
    name: "Doom Hammer",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.TWO_HANDED,
    stats: {
      strength: 100,
      intelligence: 100,
      defense: 0,
      constitution: 0,
    },
    range: 100,
    cost: 1,
  },
];
