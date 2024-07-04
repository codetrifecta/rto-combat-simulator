import { create } from "zustand";
import { IChestpiece, IHelmet, ILeggings, IWeapon } from "../types";

interface IPlayerInventoryStore {
  weapons: IWeapon[];
  helmets: IHelmet[];
  chestpieces: IChestpiece[];
  leggings: ILeggings[];

  setWeapons: (weapons: IWeapon[]) => void;
  setHelmets: (helmets: IHelmet[]) => void;
  setChestpieces: (chestpieces: IChestpiece[]) => void;
  setLeggings: (leggings: ILeggings[]) => void;
}

export const usePlayerInventoryStore = create<IPlayerInventoryStore>((set) => ({
  weapons: [
    {
      id: 1,
      name: "Fists",
      damage: 1,
      range: 1,
      cost: 1,
    },
    {
      id: 1,
      name: "Club",
      damage: 2,
      range: 1,
      cost: 1,
    },
    {
      id: 2,
      name: "Sword",
      damage: 3,
      range: 1,
      cost: 2,
    },
    {
      id: 3,
      name: "Bow",
      damage: 2,
      range: 5,
      cost: 2,
    },
    {
      id: 4,
      name: "Magic Staff",
      damage: 1,
      range: 3,
      cost: 1,
    },
  ],
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
