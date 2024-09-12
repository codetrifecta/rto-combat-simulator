import { create } from 'zustand';
import { IEntity } from '../types';
import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';
import { ROOM_LENGTH } from '../constants/game';

interface IGameStateStore {
  doorPositions: [number, number][];
  hoveredTile: [number, number] | null;
  roomLength: number;
  roomTileMatrix: TILE_TYPE[][];
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>;
  turnCycle: IEntity[];
  isRoomOver: boolean;
  isGameOver: boolean;
  isLoading: boolean;
  isInventoryOpen: boolean;
  isGameLogOpen: boolean;
  isCharacterSheetOpen: boolean;
  isCompendiumOpen: boolean;
  isGenerateRoomOpen: boolean;
  isChestOpen: boolean;
  isMinimapOpen: boolean;
  file: string;
  floorArtFile: string;
  wallArtFile: string;
  setDoorPositions: (doorPositions: [number, number][]) => void;
  setHoveredTile: (hoveredTile: [number, number] | null) => void;
  setRoomLength: (roomLength: number) => void;
  setRoomTileMatrix: (roomTileMatrix: TILE_TYPE[][]) => void;
  setRoomEntityPositions: (
    roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
  ) => void;
  getCurrentTurnEntity: () => IEntity | null;
  endTurn: () => void;
  setIsInventoryOpen: (isInventoryOpen: boolean) => void;
  setIsGameLogOpen: (isGameLogOpen: boolean) => void;
  setIsCharacterSheetOpen: (isCharacterSheetOpen: boolean) => void;
  setIsCompendiumOpen: (isCompendiumOpen: boolean) => void;
  setIsGenerateRoomOpen: (isGenerateRoomOpen: boolean) => void;
  setIsMinimapOpen: (isMinimapOpen: boolean) => void;
  setTurnCycle: (turnCycle: IEntity[]) => void;
  setIsRoomOver: (isRoomOver: boolean) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsChestOpen: (isChestOpen: boolean) => void;
  setFile: (file: string) => void;
  setFloorArtFile: (floorArtFile: string) => void;
  setWallArtFile: (wallArtFile: string) => void;
}

export const useGameStateStore = create<IGameStateStore>((set, get) => ({
  doorPositions: [],
  hoveredTile: null,
  roomLength: ROOM_LENGTH,
  // roomTileMatrix: generateInitialRoomTileMatrix(),
  // roomEntityPositions: generateInitialRoomEntityPositions(),
  roomTileMatrix: [],
  roomEntityPositions: new Map(),
  turnCycle: [],
  isRoomOver: false,
  isGameOver: false,
  isLoading: true,
  isInventoryOpen: false,
  isGameLogOpen: true,
  isCharacterSheetOpen: false,
  isGenerateRoomOpen: false,
  isCompendiumOpen: false,
  isChestOpen: false,
  isMinimapOpen: true,
  file: '',
  floorArtFile: '',
  wallArtFile: '',

  setDoorPositions: (doorPositions: [number, number][]) =>
    set({ doorPositions }),

  setHoveredTile: (hoveredTile: [number, number] | null) =>
    set({ hoveredTile }),

  setRoomLength: (roomLength: number) => set({ roomLength }),

  setRoomTileMatrix: (roomTileMatrix: TILE_TYPE[][]): void =>
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

  setIsCompendiumOpen: (isCompendiumOpen: boolean) => set({ isCompendiumOpen }),

  setIsGenerateRoomOpen: (isGenerateRoomOpen: boolean) =>
    set({ isGenerateRoomOpen }),

  setIsChestOpen: (isChestOpen: boolean) => set({ isChestOpen }),

  setIsMinimapOpen: (isMinimapOpen: boolean) => set({ isMinimapOpen }),

  setTurnCycle: (turnCycle: IEntity[]) => set({ turnCycle }),

  setIsRoomOver: (isRoomOver: boolean) => set({ isRoomOver }),

  setIsGameOver: (isGameOver: boolean) => set({ isGameOver }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setFile: (file: string) => set({ file }),

  setFloorArtFile: (floorArtFile: string) => set({ floorArtFile }),

  setWallArtFile: (wallArtFile: string) => set({ wallArtFile }),
}));
