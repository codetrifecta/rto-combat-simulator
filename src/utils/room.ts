import { TILE_TYPE } from '../constants/tile';

// Initialize room 2d array
export function initRoomWithOnlyFloors(size: number): [TILE_TYPE, number][][] {
  const room_arr: [TILE_TYPE, number][][] = new Array(size);

  for (let row = 0; row < size; row++) {
    room_arr[row] = [];

    for (let col = 0; col < size; col++) {
      room_arr[row][col] = [TILE_TYPE.FLOOR, 1];
    }
  }

  return room_arr;
}
