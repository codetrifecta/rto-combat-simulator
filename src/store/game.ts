import { create } from 'zustand';
import { IEntity } from '../types';
import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';
import { generateRoomEntityPositions, generateRoomTileMatrix } from '../utils';
import { ROOM_LENGTH } from '../constants/game';

interface IGameStateStore {
  roomLength: number;
  roomTileMatrix: [TILE_TYPE, number][][];
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>;
  turnCycle: IEntity[];
  isRoomOver: boolean;
  isGameOver: boolean;
  isLoading: boolean;
  isInventoryOpen: boolean;
  isGameLogOpen: boolean;
  isCharacterSheetOpen: boolean;
  isGenerateRoomOpen: boolean;
  setRoomLength: (roomLength: number) => void;
  setRoomTileMatrix: (roomTileMatrix: [TILE_TYPE, number][][]) => void;
  setRoomEntityPositions: (
    roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
  ) => void;
  getCurrentTurnEntity: () => IEntity | null;
  endTurn: () => void;
  setIsInventoryOpen: (isInventoryOpen: boolean) => void;
  setIsGameLogOpen: (isGameLogOpen: boolean) => void;
  setIsCharacterSheetOpen: (isCharacterSheetOpen: boolean) => void;
  setIsGenerateRoomOpen: (isGenerateRoomOpen: boolean) => void;
  setTurnCycle: (turnCycle: IEntity[]) => void;
  setIsRoomOver: (isRoomOver: boolean) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGameStateStore = create<IGameStateStore>((set, get) => ({
  roomLength: ROOM_LENGTH,
  roomTileMatrix: generateRoomTileMatrix(ROOM_LENGTH),
  roomEntityPositions: generateRoomEntityPositions(),
  turnCycle: [],
  isRoomOver: false,
  isGameOver: false,
  isLoading: true,
  isInventoryOpen: false,
  isGameLogOpen: true,
  isCharacterSheetOpen: false,
  isGenerateRoomOpen: false,

  setRoomLength: (roomLength: number) => set({ roomLength }),

  setRoomTileMatrix: (roomTileMatrix: [TILE_TYPE, number][][]): void =>
    set({ roomTileMatrix }),

  setRoomEntityPositions: (
    roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
  ): void => set({ roomEntityPositions }),

  getCurrentTurnEntity: () => {
    const currentTurnEntity = get().turnCycle[0];

    if (!currentTurnEntity) {
      console.error('No current turn entity in turn cycle!');
      return null;
    }

    return currentTurnEntity;
  },

  // Remove current turn entity from turn cycle and add it to the end
  endTurn: () => {
    const currentTurnCycle = get().turnCycle;
    const currentTurnEntity = get().turnCycle.shift();

    if (!currentTurnEntity) {
      console.error('No current turn entity in turn cycle!');
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

  setIsGameOver: (isGameOver: boolean) => set({ isGameOver }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
