import {
  ENTITY_TYPE,
  SKILL_TYPE,
  WEAPON_ATTACK_TYPE,
  WEAPON_TYPE,
} from "./constants";

export interface IEntity {
  id: number;
  name: string;
  entityType: ENTITY_TYPE;
  health: number;
  maxHealth: number;
  statuses: IStatus[];
  damageBonus: number;
}

export type IAllEntity = IEntity | IPlayer | IEnemy;

export interface IPlayer extends IEntity {
  actionPoints: number;
  skills: ISkill[];
  state: IPlayerState;
  equipment: {
    weapon: IWeapon | null;
    helmet: IHelmet | null;
    chestpiece: IChestpiece | null;
    legging: ILegging | null;
  };
}

export interface IPlayerState {
  isAttacking: boolean;
  isMoving: boolean;
  isUsingSkill: boolean;
  skillId?: number;
}

export interface IEnemy extends IEntity {
  range: number;
  damage: number;
}

export interface IGameState {
  turnCycle: IEntity[];
  isRoomOver: boolean;
  isLoading: boolean;
}

export interface ISkill {
  id: number;
  name: string;
  skillType: SKILL_TYPE;
  description: string;
  damage: number;
  range: number;
  cooldown: number;
  cooldownCounter: number;
  cost: number;
}

export interface IStatus {
  id: number;
  name: string;
  description: string;
  duration: number;
  durationCounter: number;
  effect: IStatusEffect;
}

export interface IStatusEffect {
  damageBonus: number;
  incomingDamageReduction: number;
  damageOverTime: number;
  canMove: boolean;
  canAttack: boolean;
}

export interface IWeapon {
  id: number;
  name: string;
  attackType: WEAPON_ATTACK_TYPE.MELEE | WEAPON_ATTACK_TYPE.RANGED;
  type: WEAPON_TYPE;
  stats: IStats;
  range: number;
  cost: number;
}

export interface IStats {
  strength: number;
  intelligence: number;
  defense: number;
  constitution: number;
}

export interface IArmor {
  id: number;
  name: string;
  stats: IStats;
}

export interface IHelmet extends IArmor {}

export interface IChestpiece extends IArmor {}

export interface ILegging extends IArmor {}

export interface ILog {
  message: string | JSX.Element;
  type: "info" | "error";
}
