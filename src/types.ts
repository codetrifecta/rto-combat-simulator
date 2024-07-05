import { ENTITY_TYPE } from "./constants";

export interface IEntity {
  id: number;
  name: string;
  entityType: ENTITY_TYPE;
  health: number;
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
}

export interface IEnemy extends IEntity {}

export interface IGameState {
  turnCycle: IEntity[];
  isRoomOver: boolean;
  isLoading: boolean;
}

export interface ISkill {
  id: number;
  name: string;
  description: string;
  damage: number;
  range: number;
  cooldown: number;
  cooldownCounter: number;
  cost: number;
  effect: (entity: IPlayer, setEntity: (entity: IPlayer) => void) => void;
}

export interface IStatus {
  id: 1;
  name: string;
  description: string;
  duration: number;
  durationCounter: number;
  effect: IStatusEffect;
}

export interface IStatusEffect {
  damageBonus: number;
}

export interface IWeapon {
  id: number;
  name: string;
  damage: number;
  range: number;
  cost: number;
}

export interface IArmor {
  id: number;
  name: string;
  defense: number;
}

export interface IHelmet extends IArmor {}

export interface IChestpiece extends IArmor {}

export interface ILegging extends IArmor {}

export interface ILog {
  message: string | JSX.Element;
  type: "info" | "error";
}
