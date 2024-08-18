import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

/**
 * Initialize a room with only floor tiles
 * @param size Size of the room
 * @returns 2D array of floor tiles
 */
export const initRoomWithOnlyFloors = (size: number): TILE_TYPE[][] => {
  const room_arr: TILE_TYPE[][] = new Array(size);

  for (let row = 0; row < size; row++) {
    room_arr[row] = [];

    for (let col = 0; col < size; col++) {
      room_arr[row][col] = TILE_TYPE.FLOOR;
    }
  }

  return room_arr;
};

/**
 * Initialize a boolean matrix with a default value
 * @param size Size of the matrix
 * @param bool (Optional) Default value for the matrix
 * @returns 2D array of booleans
 */
export const initBoolMatrix = (
  size: number,
  bool: boolean = false
): boolean[][] => {
  const matrix: boolean[][] = new Array(size);

  for (let row = 0; row < size; row++) {
    matrix[row] = new Array(size).fill(bool);
  }

  return matrix;
};

/**
 * Convert a room to a string array
 * @param room 2D array of tiles
 * @param roomEntityPositions Map of entity positions
 * @param visionMap 2D array of booleans representing the vision of the entity (default: true 2d array)
 * @returns String array of the room where
 *          floor tiles are represented by '.' and wall tiles are represented by '#',
 *          and entities are represented by 'P' for player and 'E' for enemy,
 *          each separated by a space.
 */
export const roomToStringArray = (
  room: TILE_TYPE[][],
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>,
  visionMap: boolean[][] = initBoolMatrix(room.length, true)
): string[] => {
  const roomString: string[] = [];
  for (let row = 0; row < room.length; row++) {
    let rowStr = ' ';
    for (let col = 0; col < room[row].length; col++) {
      if (visionMap && !visionMap[row][col]) {
        rowStr += 'X ';
        continue;
      }

      const entityKey = `${row},${col}`;
      if (roomEntityPositions.has(entityKey)) {
        const entityIfExists = roomEntityPositions.get(entityKey);

        if (!entityIfExists) {
          throw new Error('Entity does not exist');
        }

        rowStr += entityIfExists[0] === ENTITY_TYPE.PLAYER ? 'P ' : 'E ';
        continue;
      }

      rowStr += room[row][col] === TILE_TYPE.FLOOR ? '. ' : '# ';
    }
    roomString.push(rowStr);
  }

  return roomString;
};

/**
 * Print a room string to the console (only tiles, no entities)
 * @param room 2D array of tiles
 * @param visionMap 2D array of booleans representing the vision of the entity
 */
export const printRoomString = (
  room: TILE_TYPE[][],
  visionMap: boolean[][]
) => {
  for (let i = 0; i < room.length; i++) {
    let row = '[ ';
    for (let j = 0; j < room[i].length; j++) {
      if (visionMap[i][j]) {
        // If the tile is visible
        if (room[i][j] == TILE_TYPE.FLOOR) {
          // If the tile is a floor
          row += '. ';
        } else {
          // If the tile is a wall
          row += '# ';
        }
      } else {
        // If the tile is not visible
        row += 'X ';
      }
    }
    row += ']';
    console.log(row);
  }
};
