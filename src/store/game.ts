import { create } from "zustand";
import { IEntity } from "../types";

interface IGameStateStore {
  turnCycle: IEntity[];
  isRoomOver: boolean;
  isLoading: boolean;
  isInventoryOpen: boolean;
  isGameLogOpen: boolean;
  isCharacterSheetOpen: boolean;
  isGenerateRoomOpen: boolean;
  getCurrentTurnEntity: () => IEntity | null;
  endTurn: () => void;
  setIsInventoryOpen: (isInventoryOpen: boolean) => void;
  setIsGameLogOpen: (isGameLogOpen: boolean) => void;
  setIsCharacterSheetOpen: (isCharacterSheetOpen: boolean) => void;
  setIsGenerateRoomOpen: (isGenerateRoomOpen: boolean) => void;
  setTurnCycle: (turnCycle: IEntity[]) => void;
  setIsRoomOver: (isRoomOver: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGameStateStore = create<IGameStateStore>((set, get) => ({
  turnCycle: [],
  isRoomOver: false,
  isLoading: true,
  isInventoryOpen: false,
  isGameLogOpen: true,
  isCharacterSheetOpen: false,
  isGenerateRoomOpen: false,

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

  setIsInventoryOpen: (isInventoryOpen: boolean) => set({ isInventoryOpen }),

  setIsGameLogOpen: (isGameLogOpen: boolean) => set({ isGameLogOpen }),

  setIsCharacterSheetOpen: (isCharacterSheetOpen: boolean) =>
    set({ isCharacterSheetOpen }),

  setIsGenerateRoomOpen: (isGenerateRoomOpen: boolean) =>
    set({ isGenerateRoomOpen }),

  setTurnCycle: (turnCycle: IEntity[]) => set({ turnCycle }),

  setIsRoomOver: (isRoomOver: boolean) => set({ isRoomOver }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
