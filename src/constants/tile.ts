import { SPRITE_ID } from './sprite';

export const TILE_SIZE = 50;

export enum TILE_TYPE {
  NULL = 0,
  FLOOR = 1,
  OBSTACLE = 2,
  WALL = 3,
  DOOR = 4,
  CHEST = 5,
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
  {
    tileType: TILE_TYPE.WALL,
    id: 2,
    sprite: SPRITE_ID.CELLAR_WALL_002,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 3,
    sprite: SPRITE_ID.CELLAR_WALL_003,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 4,
    sprite: SPRITE_ID.CELLAR_WALL_004,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 5,
    sprite: SPRITE_ID.CELLAR_WALL_005,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 6,
    sprite: SPRITE_ID.CELLAR_WALL_006,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 30,
    sprite: SPRITE_ID.CELLAR_WALL_030,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 32,
    sprite: SPRITE_ID.CELLAR_WALL_032,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 34,
    sprite: SPRITE_ID.CELLAR_WALL_034,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 35,
    sprite: SPRITE_ID.CELLAR_WALL_035,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 36,
    sprite: SPRITE_ID.CELLAR_WALL_036,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 62,
    sprite: SPRITE_ID.CELLAR_WALL_062,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 64,
    sprite: SPRITE_ID.CELLAR_WALL_064,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 66,
    sprite: SPRITE_ID.CELLAR_WALL_066,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 67,
    sprite: SPRITE_ID.CELLAR_WALL_067,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 93,
    sprite: SPRITE_ID.CELLAR_WALL_093,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 94,
    sprite: SPRITE_ID.CELLAR_WALL_094,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 95,
    sprite: SPRITE_ID.CELLAR_WALL_095,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 365,
    sprite: SPRITE_ID.CELLAR_DOOR_365,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 366,
    sprite: SPRITE_ID.CELLAR_DOOR_366,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 367,
    sprite: SPRITE_ID.CELLAR_DOOR_367,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 396,
    sprite: SPRITE_ID.CELLAR_DOOR_396,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 398,
    sprite: SPRITE_ID.CELLAR_DOOR_398,
  },
  {
    tileType: TILE_TYPE.WALL,
    id: 253,
    sprite: SPRITE_ID.CELLAR_DOOR_253,
  },
];

export const DOORS: ITile[] = [
  {
    tileType: TILE_TYPE.DOOR,
    id: 397,
    sprite: SPRITE_ID.CELLAR_DOOR_397,
  },
  {
    tileType: TILE_TYPE.DOOR,
    id: 282,
    sprite: SPRITE_ID.CELLAR_DOOR_282,
  },
];
