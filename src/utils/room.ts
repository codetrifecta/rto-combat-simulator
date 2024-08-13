import { TILE_TYPE } from '../constants/tile';

/**
 * Initialize a room with only floor tiles
 * @param size Size of the room
 * @returns 2D array of floor tiles
 */
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
