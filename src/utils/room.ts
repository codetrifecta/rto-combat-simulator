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

/**
 * Generate initial room matrix based on the room length
 * @returns a 2D array of type TILE_TYPE. Here represented by numbers
 */
export const generateInitialRoomTileMatrix = () => {
  return [
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
  ];
};

/**
 * Generate initial room entity positions
 * @returns a map of entity type and id to position
 */
export const generateInitialRoomEntityPositions: () => Map<
  string,
  [ENTITY_TYPE, number]
> = () => {
  const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(); // Map of entity type and id to position

  // Place entities in the room
  // Place player: 13,7 for bottom middle of a 15x15 room
  roomEntityPositions.set(`3,6`, [ENTITY_TYPE.PLAYER, 1]);

  // Place enemies (that match the number of enemies specified in enemy store)
  roomEntityPositions.set(`11,12`, [ENTITY_TYPE.ENEMY, 1]);
  roomEntityPositions.set(`8,6`, [ENTITY_TYPE.ENEMY, 2]);
  roomEntityPositions.set(`5,3`, [ENTITY_TYPE.ENEMY, 3]);
  roomEntityPositions.set(`3,7`, [ENTITY_TYPE.ENEMY, 4]);

  return roomEntityPositions;
};

/**
 * Update room entity positions
 * @param newPos new position
 * @param currentPos current position
 * @param prevEntityPositions previous entity positions
 * @returns an updated map of entity type and id to position
 */
export const updateRoomEntityPositions: (
  newPos: [number, number],
  currentPos: [number, number],
  prevEntityPositions: Map<string, [ENTITY_TYPE, number]>
) => Map<string, [ENTITY_TYPE, number]> = (
  newPos,
  currentPos,
  prevEntityPositions
) => {
  const newRoomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(
    prevEntityPositions
  );

  // Get entity at current position
  const entity = newRoomEntityPositions.get(
    `${currentPos[0]},${currentPos[1]}`
  );

  if (!entity) {
    return newRoomEntityPositions;
  }

  // Update entity position
  newRoomEntityPositions.delete(`${currentPos[0]},${currentPos[1]}`);
  newRoomEntityPositions.set(`${newPos[0]},${newPos[1]}`, entity);

  return newRoomEntityPositions;
};
