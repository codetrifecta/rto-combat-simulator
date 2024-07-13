import { ISkill } from "../types";
import { ICON_ID } from "./icons";

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
    icon: ICON_ID.BASIC_ATTACK,
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
    icon: ICON_ID.SKILL_DEFENSE_UP,
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
    icon: ICON_ID.SKILL_PETRIFY,
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
    icon: ICON_ID.SKILL_LIGHTNING,
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
    icon: ICON_ID.SKILL_FIREBALL,
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
    icon: ICON_ID.SKILL_WHIRLWIND,
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
    icon: ICON_ID.SKILL_TELEPORT,
    skillType: SKILL_TYPE.ST,
    description: "Fly to an empty tile in the room.",
    damageMultiplier: 0,
    range: 5,
    cooldown: 4,
    cooldownCounter: 0,
    cost: 1,
  },
];
