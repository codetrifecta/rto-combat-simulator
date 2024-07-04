import { ENTITY_TYPE } from "./constants";

export interface IEntity {
  id: number;
  name: string;
  entityType: ENTITY_TYPE;
  health: number;
}

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
  isGameOver: boolean;
  isLoading: boolean;
}

export interface ISkill {
  name: string;
  damage: number;
  range: number;
  cooldown: number;
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
