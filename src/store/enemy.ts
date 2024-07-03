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
    },
    {
      id: 2,
      name: "Shade",
      entityType: ENTITY_TYPE.ENEMY,
      health: 3,
    },
  ],

  getEnemies: () => {
    const enemies: IEnemy[] = get().enemies;
    return enemies;
  },
  setEnemies: (enemies: IEnemy[]) => set({ enemies }),
}));
