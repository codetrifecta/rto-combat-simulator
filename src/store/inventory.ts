import { create } from "zustand";
import { IChestpiece, IHelmet, ILegging, IWeapon } from "../types";
import { WEAPONS } from "../constants/weapon";

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
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 2,
      name: "Steel Helmet",
      stats: {
        defense: 2,
        strength: 1,
        intelligence: 1,
        constitution: 2,
      },
    },
    {
      id: 7,
      name: "Berserker Helmet",
      stats: {
        defense: 1,
        strength: 3,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 10,
      name: "Wizard Hat",
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 3,
        constitution: 1,
      },
    },
  ],
  chestpieces: [
    {
      id: 3,
      name: "Leather Vest",
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 4,
      name: "Steel Chestplate",
      stats: {
        defense: 2,
        strength: 1,
        intelligence: 1,
        constitution: 2,
      },
    },
    {
      id: 8,
      name: "Berserker Chestplate",
      stats: {
        defense: 1,
        strength: 3,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 11,
      name: "Wizard Robes",
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 3,
        constitution: 1,
      },
    },
  ],
  leggings: [
    {
      id: 5,
      name: "Leather Pants",
      stats: {
        defense: 1,
        strength: 1,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 6,
      name: "Steel Leggings",
      stats: {
        defense: 2,
        strength: 1,
        intelligence: 1,
        constitution: 2,
      },
    },
    {
      id: 9,
      name: "Berserker Leggings",
      stats: {
        defense: 1,
        strength: 3,
        intelligence: 1,
        constitution: 1,
      },
    },
    {
      id: 12,
      name: "Wizard Pants",
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
