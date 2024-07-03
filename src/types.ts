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
    armor: IArmor | null;
    leggings: ILeggings | null;
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
  name: string;
  damage: number;
  range: number;
  cost: number;
}

export interface IHelmet {
  name: string;
  defense: number;
}

export interface IArmor {
  name: string;
  defense: number;
}

export interface ILeggings {
  name: string;
  defense: number;
}
