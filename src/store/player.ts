import { create } from "zustand";
import { ENTITY_TYPE } from "../constants";
import {
  IChestpiece,
  IHelmet,
  ILegging,
  IPlayer,
  IPlayerState,
  IWeapon,
} from "../types";

interface IPlayerStore extends IPlayer {
  getPlayer: () => IPlayer;
  setPlayer: (player: IPlayer) => void;
  setPlayerActionPoints: (actionPoints: number) => void;
  setPlayerState: (state: IPlayerState) => void;
  setPlayerWeapon: (weapon: IWeapon | null) => void;
  setPlayerHelmet: (helmet: IHelmet | null) => void;
  setPlayerChestpiece: (chestpiece: IChestpiece | null) => void;
  setPlayerLegging: (legging: ILegging | null) => void;
}

export const usePlayerStore = create<IPlayerStore>((set, get) => ({
  id: 1,
  name: "Kratos",
  entityType: ENTITY_TYPE.PLAYER,
  health: 10,
  actionPoints: 2,
  skills: [],
  state: {
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  },
  equipment: {
    weapon: {
      id: 1,
      name: "Fists",
      damage: 1,
      range: 1,
      cost: 1,
    },
    helmet: null,
    chestpiece: null,
    legging: null,
  },

  getPlayer: () => {
    const player: IPlayer = {
      id: get().id,
      name: get().name,
      entityType: get().entityType,
      health: get().health,
      actionPoints: get().actionPoints,
      skills: get().skills,
      state: get().state,
      equipment: get().equipment,
    };
    return player;
  },
  setPlayer: (player: IPlayer) => set({ ...player }),

  setPlayerActionPoints: (actionPoints: number) => set({ actionPoints }),

  setPlayerState: (state: IPlayerState) => set({ state }),

  setPlayerWeapon: (weapon: IWeapon | null) =>
    set({ equipment: { ...get().equipment, weapon } }),
  setPlayerHelmet: (helmet: IHelmet | null) =>
    set({ equipment: { ...get().equipment, helmet } }),
  setPlayerChestpiece: (chestpiece: IChestpiece | null) =>
    set({ equipment: { ...get().equipment, chestpiece } }),
  setPlayerLegging: (legging: ILegging | null) =>
    set({ equipment: { ...get().equipment, legging } }),
}));
