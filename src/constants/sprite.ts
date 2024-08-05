// PLAYER
import player_01 from '../assets/sprites/players/sprite_player_01.png';

// ENEMIES
import enemy_demon_02 from '../assets/sprites/enemies/sprite_enemy_demon_02.png';
import enemy_demon_10 from '../assets/sprites/enemies/sprite_enemy_demon_10.png';
import enemy_demon_12 from '../assets/sprites/enemies/sprite_enemy_demon_12.png';
import enemy_demon_13 from '../assets/sprites/enemies/sprite_enemy_demon_13.png';

// From Rogue Adventures Asset Pack
import enemy_008_A from '../assets/sprites/enemies/sprite_enemy_008_A.png';

// FLOORS
import tile_cellar_039 from '../assets/sprites/tiles/cellar/floor/sprite_tile_cellar_039.png';

// WALLS
import tile_cellar_001 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_001.png';
import tile_cellar_002 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_002.png';
import tile_cellar_003 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_003.png';
import tile_cellar_004 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_004.png';
import tile_cellar_005 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_005.png';
import tile_cellar_006 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_006.png';
import tile_cellar_030 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_030.png';
import tile_cellar_032 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_032.png';
import tile_cellar_034 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_034.png';
import tile_cellar_035 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_035.png';
import tile_cellar_036 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_036.png';
import tile_cellar_062 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_062.png';
import tile_cellar_064 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_064.png';
import tile_cellar_066 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_066.png';
import tile_cellar_067 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_067.png';
import tile_cellar_093 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_093.png';
import tile_cellar_094 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_094.png';
import tile_cellar_095 from '../assets/sprites/tiles/cellar/wall/sprite_tile_cellar_095.png';

// WALLS - DOORS
import tile_cellar_365 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_365.png';
import tile_cellar_366 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_366.png';
import tile_cellar_367 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_367.png';
import tile_cellar_396 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_396.png';
import tile_cellar_398 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_398.png';
import tile_cellar_253 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_253.png';

// DOORS
import tile_cellar_397 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_397.png';
import tile_cellar_282 from '../assets/sprites/tiles/cellar/door/sprite_tile_cellar_282.png';

export const SPRITE_SIZE = 64;
export const FLOOR_SIZE = 32;

export enum SPRITE_ID {
  // PLAYER
  PLAYER_01 = 'PLAYER_01',

  // ENEMIES
  DEMON_02 = 'DEMON_02',
  DEMON_10 = 'DEMON_10',
  DEMON_12 = 'DEMON_12',
  DEMON_13 = 'DEMON_13',

  // From Rogue Adventures Asset Pack
  ENEMY_008_A = 'ENEMY_008_A',

  // FLOORS
  CELLAR_FLOOR_001 = 'tile_cellar_039',

  // WALLS
  CELLAR_WALL_001 = 'cellar_wall_001',
  CELLAR_WALL_002 = 'cellar_wall_002',
  CELLAR_WALL_003 = 'cellar_wall_003',
  CELLAR_WALL_004 = 'cellar_wall_004',
  CELLAR_WALL_005 = 'cellar_wall_005',
  CELLAR_WALL_006 = 'cellar_wall_006',
  CELLAR_WALL_030 = 'cellar_wall_030',
  CELLAR_WALL_032 = 'cellar_wall_032',
  CELLAR_WALL_034 = 'cellar_wall_034',
  CELLAR_WALL_035 = 'cellar_wall_035',
  CELLAR_WALL_036 = 'cellar_wall_036',
  CELLAR_WALL_062 = 'cellar_wall_062',
  CELLAR_WALL_064 = 'cellar_wall_064',
  CELLAR_WALL_066 = 'cellar_wall_066',
  CELLAR_WALL_067 = 'cellar_wall_067',
  CELLAR_WALL_093 = 'cellar_wall_093',
  CELLAR_WALL_094 = 'cellar_wall_094',
  CELLAR_WALL_095 = 'cellar_wall_095',

  // WALLS - DOORS
  CELLAR_DOOR_365 = 'cellar_door_365',
  CELLAR_DOOR_366 = 'cellar_door_366',
  CELLAR_DOOR_367 = 'cellar_door_367',
  CELLAR_DOOR_396 = 'cellar_door_396',
  CELLAR_DOOR_398 = 'cellar_door_398',
  CELLAR_DOOR_253 = 'cellar_door_253',

  // DOORS
  CELLAR_DOOR_397 = 'cellar_door_397',
  CELLAR_DOOR_282 = 'cellar_door_282',
}

export const SPRITES: Record<SPRITE_ID, string> = {
  // PLAYER
  [SPRITE_ID.PLAYER_01]: player_01,

  // ENEMIES
  [SPRITE_ID.DEMON_02]: enemy_demon_02,
  [SPRITE_ID.DEMON_10]: enemy_demon_10,
  [SPRITE_ID.DEMON_12]: enemy_demon_12,
  [SPRITE_ID.DEMON_13]: enemy_demon_13,

  // From Rogue Adventures Asset Pack
  [SPRITE_ID.ENEMY_008_A]: enemy_008_A,

  // FLOORS
  [SPRITE_ID.CELLAR_FLOOR_001]: tile_cellar_039,

  // WALLS
  [SPRITE_ID.CELLAR_WALL_001]: tile_cellar_001,
  [SPRITE_ID.CELLAR_WALL_002]: tile_cellar_002,
  [SPRITE_ID.CELLAR_WALL_003]: tile_cellar_003,
  [SPRITE_ID.CELLAR_WALL_004]: tile_cellar_004,
  [SPRITE_ID.CELLAR_WALL_005]: tile_cellar_005,
  [SPRITE_ID.CELLAR_WALL_006]: tile_cellar_006,
  [SPRITE_ID.CELLAR_WALL_030]: tile_cellar_030,
  [SPRITE_ID.CELLAR_WALL_032]: tile_cellar_032,
  [SPRITE_ID.CELLAR_WALL_034]: tile_cellar_034,
  [SPRITE_ID.CELLAR_WALL_035]: tile_cellar_035,
  [SPRITE_ID.CELLAR_WALL_036]: tile_cellar_036,
  [SPRITE_ID.CELLAR_WALL_062]: tile_cellar_062,
  [SPRITE_ID.CELLAR_WALL_064]: tile_cellar_064,
  [SPRITE_ID.CELLAR_WALL_066]: tile_cellar_066,
  [SPRITE_ID.CELLAR_WALL_067]: tile_cellar_067,
  [SPRITE_ID.CELLAR_WALL_093]: tile_cellar_093,
  [SPRITE_ID.CELLAR_WALL_094]: tile_cellar_094,
  [SPRITE_ID.CELLAR_WALL_095]: tile_cellar_095,

  // WALLS - DOORS
  [SPRITE_ID.CELLAR_DOOR_365]: tile_cellar_365,
  [SPRITE_ID.CELLAR_DOOR_366]: tile_cellar_366,
  [SPRITE_ID.CELLAR_DOOR_367]: tile_cellar_367,
  [SPRITE_ID.CELLAR_DOOR_396]: tile_cellar_396,
  [SPRITE_ID.CELLAR_DOOR_398]: tile_cellar_398,
  [SPRITE_ID.CELLAR_DOOR_253]: tile_cellar_253,

  // DOORS
  [SPRITE_ID.CELLAR_DOOR_397]: tile_cellar_397,
  [SPRITE_ID.CELLAR_DOOR_282]: tile_cellar_282,
};

export const getSpriteSrc = (spriteID: SPRITE_ID) => SPRITES[spriteID] || '';
