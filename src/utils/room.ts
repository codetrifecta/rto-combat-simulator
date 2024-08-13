import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

/**
 * Initialize a room with only floor tiles
 * @param size Size of the room
 * @returns 2D array of floor tiles
 */
export const initRoomWithOnlyFloors = (
  size: number
): [TILE_TYPE, number][][] => {
  const room_arr: [TILE_TYPE, number][][] = new Array(size);

  for (let row = 0; row < size; row++) {
    room_arr[row] = [];

    for (let col = 0; col < size; col++) {
      room_arr[row][col] = [TILE_TYPE.FLOOR, 1];
    }
  }

  return room_arr;
};

/**
 * Convert a room to a string array
 * @param room 2D array of tiles
 * @param roomEntityPositions Map of entity positions
 * @returns String array of the room where
 *          floor tiles are represented by '.' and wall tiles are represented by '#',
 *          and entities are represented by 'P' for player and 'E' for enemy,
 *          each separated by a space.
 */
export const roomToStringArray = (
  room: [TILE_TYPE, number][][],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
): string[] => {
  const roomString: string[] = [];
  for (let row = 0; row < room.length; row++) {
    let rowStr = ' ';
    for (let col = 0; col < room[row].length; col++) {
      const entityKey = `${row},${col}`;
      if (roomEntityPositions.has(entityKey)) {
        const entityIfExists = roomEntityPositions.get(entityKey);

        if (!entityIfExists) {
          throw new Error('Entity does not exist');
        }

        rowStr += entityIfExists[0] === ENTITY_TYPE.PLAYER ? 'P ' : 'E ';
        continue;
      }

      rowStr += room[row][col][0] === TILE_TYPE.FLOOR ? '. ' : '# ';
    }
    roomString.push(rowStr);
  }

  return roomString;
};
