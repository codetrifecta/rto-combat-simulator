import { create } from 'zustand';
import { IChestpiece, IHelmet, ILegging, IWeapon } from '../types';
import { WEAPONS } from '../constants/weapon';
import { CHESTPIECES, HELMETS } from '../constants/armor';

interface IPlayerInventoryStore {
  weapons: IWeapon[];
  helmets: IHelmet[];
  chestpieces: IChestpiece[];
  leggings: ILegging[];

  setWeapons: (weapons: IWeapon[]) => void;
  setHelmets: (helmets: IHelmet[]) => void;
  setChestpieces: (chestpieces: IChestpiece[]) => void;
  setLeggings: (leggings: ILegging[]) => void;
}

export const usePlayerInventoryStore = create<IPlayerInventoryStore>((set) => ({
  weapons: WEAPONS,
  helmets: HELMETS,
  chestpieces: CHESTPIECES,
  leggings: [
    {
      id: 5,
      name: 'Leather Pants',
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 6,
      name: 'Steel Leggings',
      stats: {
        defense: 2,
        strength: 1,
        intelligence: 1,
        constitution: 2,
      },
    },
    {
      id: 9,
      name: 'Berserker Leggings',
      stats: {
        defense: 1,
        strength: 3,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 12,
      name: 'Wizard Pants',
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 3,
        constitution: 1,
      },
    },
  ],

  setWeapons: (weapons) => set({ weapons }),
  setHelmets: (helmets) => set({ helmets }),
  setChestpieces: (chestpieces) => set({ chestpieces }),
  setLeggings: (leggings) => set({ leggings }),
}));
