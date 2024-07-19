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
      intelligence: 1,
      defense: 0,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 2,
    name: "Sword",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
    stats: {
      strength: 2,
      intelligence: 0,
      defense: 2,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 3,
    name: "Katana",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
    stats: {
      strength: 3,
      intelligence: 0,
      defense: 0,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 4,
    name: "Greatsword",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.TWO_HANDED,
    stats: {
      strength: 3,
      intelligence: 0,
      defense: 2,
      constitution: 0,
    },
    range: 2,
    cost: 2,
  },
  {
    id: 5,
    name: "Glaive",
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.TWO_HANDED,
    stats: {
      strength: 4,
      intelligence: 0,
      defense: 0,
      constitution: 0,
    },
    range: 2,
    cost: 2,
  },
  {
    id: 6,
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
    id: 7,
    name: "Magic Wand",
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.WAND,
    stats: {
      strength: 0,
      intelligence: 2,
      defense: 0,
      constitution: 0,
    },
    range: 3,
    cost: 1,
  },
  {
    id: 8,
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
    cost: 2,
  },
  {
    id: 9,
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
