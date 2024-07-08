import { create } from "zustand";
import { IChestpiece, IHelmet, ILegging, IWeapon } from "../types";
import { WEAPONS } from "../constants";

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
  helmets: [
    {
      id: 1,
      name: "Leather Cap",
      defense: 1,
    },
    {
      id: 2,
      name: "Iron Helmet",
      defense: 2,
    },
  ],
  chestpieces: [
    {
      id: 3,
      name: "Leather Vest",
      defense: 1,
    },
    {
      id: 4,
      name: "Iron Chestplate",
      defense: 2,
    },
  ],
  leggings: [
    {
      id: 5,
      name: "Leather Pants",
      defense: 1,
    },
    {
      id: 6,
      name: "Iron Leggings",
      defense: 2,
    },
  ],

  setWeapons: (weapons) => set({ weapons }),
  setHelmets: (helmets) => set({ helmets }),
  setChestpieces: (chestpieces) => set({ chestpieces }),
  setLeggings: (leggings) => set({ leggings }),
}));
