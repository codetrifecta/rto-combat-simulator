import { IStatus } from "../types";
import { ICON_ID } from "./icons";

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
    icon: ICON_ID.EFFECT_ATTACK_UP,
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
    icon: ICON_ID.EFFECT_PETRIFIED,
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
    icon: ICON_ID.EFFECT_DEFENSE_UP,
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
    icon: ICON_ID.EFFECT_BURNED,
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
