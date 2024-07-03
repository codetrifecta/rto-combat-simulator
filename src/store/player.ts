import { create } from "zustand";
import { ENTITY_TYPE } from "../constants";
import { IPlayer, IPlayerState } from "../types";

interface IPlayerStore extends IPlayer {
  getPlayer: () => IPlayer;
  setPlayer: (player: IPlayer) => void;
  setPlayerActionPoints: (actionPoints: number) => void;
  setPlayerState: (state: IPlayerState) => void;
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
      name: "Club",
      damage: 2,
      range: 1,
      cost: 1,
      //   name: "Staff",
      //   damage: 1,
      //   range: 4,
      //   cost: 1,
    },
    helmet: null,
    armor: null,
    leggings: null,
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
}));
