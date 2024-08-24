import { create } from 'zustand';
import { ISummon } from '../types';

interface ISummonStore {
  summonId: number;
  summons: ISummon[];
  getSummons: () => ISummon[];
  setSummons: (summons: ISummon[]) => void;
  setSummon: (summon: ISummon) => ISummon;
  getSummonId: () => number;
}

export const useSummonStore = create<ISummonStore>((set, get) => ({
  summonId: 0,
  summons: [],

  getSummons: () => {
    const summons: ISummon[] = get().summons;
    return summons;
  },
  setSummons: (summons: ISummon[]) => set({ summons }),

  setSummon: (summon: ISummon): ISummon => {
    let updatedSummon: ISummon = summon;
    const summons = get().summons.map((e) => {
      if (e.id === summon.id) {
        updatedSummon = summon;
        return summon;
      }
      return e;
    });

    set({ summons });
    return updatedSummon;
  },

  getSummonId: () => {
    const summonId = get().summonId;
    set({ summonId: summonId + 1 });
    return summonId;
  },
}));
