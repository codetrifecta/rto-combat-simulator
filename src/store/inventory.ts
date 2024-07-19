import { create } from 'zustand';
import { IChestpiece, IHelmet, ILegging, IWeapon } from '../types';
import { WEAPONS } from '../constants/weapon';
import { CHESTPIECES, HELMETS, LEGGINGS } from '../constants/armor';

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
  leggings: LEGGINGS,

  setWeapons: (weapons) => set({ weapons }),
  setHelmets: (helmets) => set({ helmets }),
  setChestpieces: (chestpieces) => set({ chestpieces }),
  setLeggings: (leggings) => set({ leggings }),
}));
