import { SPRITE_ID } from './sprite';

export const TILE_SIZE = 48; // Default to 50

export enum TILE_TYPE {
  NULL = -1,
  FLOOR = 0,
  WALL = 1,
  DOOR = 2,
}

interface ITile {
  tileType: TILE_TYPE;
  id: number;
  sprite: SPRITE_ID;
}

export const FLOORS: ITile[] = [
  {
    tileType: TILE_TYPE.FLOOR,
    id: 1,
    sprite: SPRITE_ID.CELLAR_FLOOR_001,
  },
];

export const WALLS: ITile[] = [
  {
    tileType: TILE_TYPE.WALL,
    id: 1,
    sprite: SPRITE_ID.CELLAR_WALL_001,
  },
];
