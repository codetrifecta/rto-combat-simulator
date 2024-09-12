import { IFloor, IRoom } from '../types';
import { ROOM_TYPE } from '../utils/floor';
import { ENEMY_PRESET_ID, ENEMY_PRESETS, ENTITY_TYPE } from './entity';
import { TILE_TYPE } from './tile';

export const BASE_ROOM: IRoom = {
  type: ROOM_TYPE.NULL,
  explored: false,
  northDoor: false,
  southDoor: false,
  eastDoor: false,
  westDoor: false,
  enemies: [],
  roomEntityPositions: new Map([['7,7', [ENTITY_TYPE.PLAYER, 1]]]),
  roomLength: 15,
  roomTileMatrix: Array.from({ length: 15 }, () =>
    Array.from({ length: 15 }, () => TILE_TYPE.FLOOR)
  ),
};

export const TUTORIAL_FLOOR: IFloor = [
  [
    {
      ...BASE_ROOM,
    },
    {
      ...BASE_ROOM,
    },
    {
      ...BASE_ROOM,
      type: ROOM_TYPE.BOSS,
      southDoor: true,
    },
  ],
  [
    {
      ...BASE_ROOM,
    },
    {
      ...BASE_ROOM,
    },
    {
      ...BASE_ROOM,
      type: ROOM_TYPE.COMMON,
      northDoor: true,
      southDoor: true,
    },
  ],
  [
    {
      ...BASE_ROOM,
    },
    {
      ...BASE_ROOM,
      type: ROOM_TYPE.START,
      eastDoor: true,
    },
    {
      ...BASE_ROOM,
      type: ROOM_TYPE.COMMON,
      westDoor: true,
      northDoor: true,
      enemies: [
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
          id: 1,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
          id: 2,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH],
          id: 3,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
          id: 4,
        },
      ],
      roomEntityPositions: new Map([
        ['3,6', [ENTITY_TYPE.PLAYER, 1]],
        ['11,12', [ENTITY_TYPE.ENEMY, 1]],
        ['8,6', [ENTITY_TYPE.ENEMY, 2]],
        ['5,3', [ENTITY_TYPE.ENEMY, 3]],
        ['3,7', [ENTITY_TYPE.ENEMY, 4]],
      ]),
      roomTileMatrix: [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
        [4, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
        [4, 1, 1, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3],
      ],
    },
  ],
];
