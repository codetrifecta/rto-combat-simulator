import { create } from "zustand";
import { IEnemy } from "../types";
import { ENEMY_PRESET_ID, ENEMY_PRESETS } from "../constants";

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
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.SHADE],
      id: 1,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.SHADE],
      id: 2,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.GORGON],
      id: 3,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.CYCLOPS],
      id: 4,
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
