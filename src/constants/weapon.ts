import { IWeapon } from "../types";

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
