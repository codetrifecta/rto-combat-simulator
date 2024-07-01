import { ENTITY_TYPE } from "./constants";

export interface Entity {
    id: number;
    name: string;
    entityType: ENTITY_TYPE;
    health: number;
}

export interface Player extends Entity{
    entityType: ENTITY_TYPE.PLAYER;
    state: PlayerState;
    skills: Skill[];
    equipment: {
        weapon: Weapon | null;
        helmet: Helmet | null;
        armor: Armor | null;
        leggings: Leggings | null;
    };
}

export interface PlayerState {
    health: number;
    actionPoints: number;
    isAttacking: boolean;
    isMoving: boolean;
    isUsingSkill: boolean;
}

export interface Enemy extends Entity{
    entityType: ENTITY_TYPE.ENEMY;
}

export interface GameState {
    turnCycle: Entity[];
    isGameOver: boolean;
    isLoading: boolean;
}

export interface Skill {
    name: string;
    damage: number;
    range: number;
    cooldown: number;
}

export interface Weapon {
    name: string;
    damage: number;
}

export interface Helmet {
    name: string;
    defense: number;
}

export interface Armor {
    name: string;
    defense: number;
}

export interface Leggings {
    name: string;
    defense: number;
}