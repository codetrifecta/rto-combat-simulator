import { ENTITY_TYPE } from './constants/entity';
import { ICON_ID } from './constants/icons';
import { SKILL_TYPE } from './constants/skill';
import { WEAPON_ATTACK_TYPE, WEAPON_TYPE } from './constants/weapon';

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

export interface ISkill {
  id: number;
  name: string;
  icon: ICON_ID;
  skillType: SKILL_TYPE;
  description: string;
  damageMultiplier: number;
  range: number;
  cooldown: number;
  cooldownCounter: number;
  cost: number;
}

export interface IStatus {
  id: number;
  name: string;
  icon: ICON_ID;
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
  icon: ICON_ID;
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
  icon: ICON_ID;
  stats: IStats;
}

export interface IHelmet extends IArmor {}

export interface IChestpiece extends IArmor {}

export interface ILegging extends IArmor {}

export interface ILog {
  message: string | JSX.Element;
  type: 'info' | 'error';
}
