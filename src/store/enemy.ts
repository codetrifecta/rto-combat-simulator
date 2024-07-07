import { create } from "zustand";
import { IEnemy } from "../types";
import { ENTITY_TYPE } from "../constants";

interface IEnemies {
  enemies: IEnemy[];
}

interface IEnemyStore extends IEnemies {
  getEnemies: () => IEnemy[];
  setEnemies: (enemies: IEnemy[]) => void;
}

export const useEnemyStore = create<IEnemyStore>((set, get) => ({
  enemies: [
    {
      id: 1,
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
  ],

  getEnemies: () => {
    const enemies: IEnemy[] = get().enemies;
    return enemies;
  },
  setEnemies: (enemies: IEnemy[]) => set({ enemies }),
}));
