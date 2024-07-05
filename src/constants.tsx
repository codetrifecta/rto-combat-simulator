import { IPlayer, ISkill, IStatus } from "./types";

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

export const SKILLS: ISkill[] = [
  {
    id: 1,
    name: "Buff Up",
    skillType: SKILL_TYPE.SELF,
    description: "Increase damage for all attacks by 2 for 3 turns.",
    damage: 0,
    range: 0,
    cooldown: 3,
    cooldownCounter: 0,
    cost: 2,
    effect: (entity: IPlayer, setEntity: (entity: IPlayer) => void) => {
      console.log("Buff Up effect");
      const newEntity: IPlayer = {
        ...entity,
        statuses: [...entity.statuses, STATUSES[0]],
      };
      setEntity(newEntity);
    },
  },
];

export const STATUSES: IStatus[] = [
  {
    id: 1,
    name: "Buffed",
    description: "Increased damage for all attacks by 2 for 3 turns.",
    duration: 3,
    durationCounter: 3,
    effect: {
      damageBonus: 2,
    },
  },
];
