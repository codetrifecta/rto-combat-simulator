import { IFloor, IRoom } from '../types';
import { ROOM_TYPE } from '../utils/floor';

const BASE_ROOM: IRoom = {
  type: ROOM_TYPE.NULL,
  explored: false,
  northDoor: false,
  southDoor: false,
  eastDoor: false,
  westDoor: false,
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
    },
  ],
];
