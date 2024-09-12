import { IRoom } from '../types';
import { ENTITY_TYPE } from './entity';

export enum ROOM_TYPE {
  NULL = 0,
  COMMON = 1,
  START = 2,
  BOSS = 3,
  MINIBOSS = 4,
  SHOP = 5,
  INTERMEDIATE = 6,
}

export const BASE_ROOM: IRoom = {
  id: 0,
  type: ROOM_TYPE.NULL,
  explored: false,
  northDoor: false,
  southDoor: false,
  eastDoor: false,
  westDoor: false,
  enemies: [],
  roomEntityPositions: new Map([['7,7', [ENTITY_TYPE.PLAYER, 1]]]),
  roomLength: 15,
  roomTileMatrix: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4],
    [3, 1, 1, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
};
