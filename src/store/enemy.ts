import { create } from "zustand";
import { IEnemy } from "../types";
import { ENTITY_TYPE } from "../constants";

interface IEnemies {
  enemies: IEnemy[];
}

interface IEnemyStore extends IEnemies {
  getEnemies: () => IEnemy[];
  setEnemies: (enemies: IEnemy[]) => void;
  setEnemy: (enemy: IEnemy) => IEnemy;
}

export const useEnemyStore = create<IEnemyStore>((set, get) => ({
  enemies: [
    {
      id: 1,
      name: "Shade",
      entityType: ENTITY_TYPE.ENEMY,
      health: 3,
      maxHealth: 3,
      range: 1,
      damage: 2,
      damageBonus: 0,
      statuses: [],
    },
    {
      id: 2,
      name: "Shade",
      entityType: ENTITY_TYPE.ENEMY,
      health: 3,
      maxHealth: 3,
      range: 1,
      damage: 2,
      damageBonus: 0,
      statuses: [],
    },
    {
      id: 3,
      name: "Gorgon",
      entityType: ENTITY_TYPE.ENEMY,
      health: 6,
      maxHealth: 6,
      range: 2,
      damage: 3,
      damageBonus: 0,
      statuses: [],
    },
    {
      id: 4,
      name: "Cyclops",
      entityType: ENTITY_TYPE.ENEMY,
      health: 10,
      maxHealth: 10,
      range: 2,
      damage: 5,
      damageBonus: 0,
      statuses: [],
    },
  ],

  getEnemies: () => {
    const enemies: IEnemy[] = get().enemies;
    return enemies;
  },
  setEnemies: (enemies: IEnemy[]) => set({ enemies }),

  setEnemy: (enemy: IEnemy): IEnemy => {
    let updatedEnemy: IEnemy = enemy;
    const enemies = get().enemies.map((e) => {
      if (e.id === enemy.id) {
        updatedEnemy = enemy;
        return enemy;
      }
      return e;
    });

    set({ enemies });
    return updatedEnemy;
  },
}));
