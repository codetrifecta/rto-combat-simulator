// ENEMIES
import enemy_demon_02 from '../assets/sprites/enemies/sprite_enemy_demon_02.png';
import enemy_demon_10 from '../assets/sprites/enemies/sprite_enemy_demon_10.png';
import enemy_demon_12 from '../assets/sprites/enemies/sprite_enemy_demon_12.png';
import enemy_demon_13 from '../assets/sprites/enemies/sprite_enemy_demon_13.png';

// FLOORS
import cellar_floor_001 from '../assets/sprites/tiles/cellar/floor/sprite_tile_cellar_039.png';

// WALLS
import cellar_wall_001 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_001.png';

export const SPRITE_SIZE = 64;
export const FLOOR_SIZE = 32;

export enum SPRITE_ID {
  // ENEMIES
  DEMON_02 = 'DEMON_02',
  DEMON_10 = 'DEMON_10',
  DEMON_12 = 'DEMON_12',
  DEMON_13 = 'DEMON_13',

  // FLOORS
  CELLAR_FLOOR_001 = 'cellar_floor_001',

  // WALLS
  CELLAR_WALL_001 = 'cellar_wall_001',
}

export const SPRITES: Record<SPRITE_ID, string> = {
  // ENEMIES
  [SPRITE_ID.DEMON_02]: enemy_demon_02,
  [SPRITE_ID.DEMON_10]: enemy_demon_10,
  [SPRITE_ID.DEMON_12]: enemy_demon_12,
  [SPRITE_ID.DEMON_13]: enemy_demon_13,

  // FLOORS
  [SPRITE_ID.CELLAR_FLOOR_001]: cellar_floor_001,

  // WALLS
  [SPRITE_ID.CELLAR_WALL_001]: cellar_wall_001,
};

export const getSpriteSrc = (spriteID: SPRITE_ID) => SPRITES[spriteID] || '';
