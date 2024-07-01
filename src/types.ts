import { ENTITY_TYPE } from "./constants";

export interface Player {
    name: string;
    health: number;
    state: PlayerState;
    skills: Skill[];
    equipment: {
        weapon: Weapon;
        helmet: Helmet;
        armor: Armor;
        leggings: Leggings;
    };
}

export interface PlayerState {
    health: number;
    actionPoints: number;
    isAttacking: boolean;
    isMoving: boolean;
    isUsingSkill: boolean;
}

export interface GameState {
    turnCycle: [ENTITY_TYPE, number][];
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