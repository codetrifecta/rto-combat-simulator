import { create } from "zustand";
import { IEntity, IGameState } from "../types";

interface IGameStateStore extends IGameState {
  getCurrentTurnEntity: () => IEntity | null;
  endTurn: () => void;
  setTurnCycle: (turnCycle: IEntity[]) => void;
  setIsRoomOver: (isRoomOver: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGameStateStore = create<IGameStateStore>((set, get) => ({
  turnCycle: [],
  isRoomOver: false,
  isLoading: true,

  getCurrentTurnEntity: () => {
    const currentTurnEntity = get().turnCycle[0];

    if (!currentTurnEntity) {
      console.error("No current turn entity in turn cycle!");
      return null;
    }

    return currentTurnEntity;
  },

  // Remove current turn entity from turn cycle and add it to the end
  endTurn: () => {
    const currentTurnCycle = get().turnCycle;
    const currentTurnEntity = get().turnCycle.shift();

    if (!currentTurnEntity) {
      console.error("No current turn entity in turn cycle!");
      return;
    }

    currentTurnCycle.push(currentTurnEntity);

    const newTurnCycle = [...currentTurnCycle];

    set({ turnCycle: newTurnCycle });
  },

  setTurnCycle: (turnCycle: IEntity[]) => set({ turnCycle }),

  setIsRoomOver: (isRoomOver: boolean) => set({ isRoomOver }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
