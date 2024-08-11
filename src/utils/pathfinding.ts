import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

// Functon to find a path taking in the tuple of current player location, the room state, and the path dictionary to be filled, given current AP
export function findPathsFromCurrentLocationDEPRECATED(
  playerLoc: [number, number],
  room: [TILE_TYPE, number][][],
  AP: number
): Map<string, [number, number][]> {
  // player_loc is starting coordinate
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [-1, 1], // Up-Right Diagonal
    [-1, -1], // Up-Left Diagonal
    [1, -1], // Down-Left Diagonal
    [1, 1], // Down-Right Diagonal
  ]; // (vertical is tuple[0], horizontal is tuple[1])

  const path_dict = new Map<string, [number, number][]>(); // Initialize path dictionary

  const frontier_queue: [number, number][] = []; // Initialize frontier queue
  frontier_queue.push(playerLoc); // Push start coordinate to frontier

  const explored = new Map<string, [number, number]>(); // Initialize explored dictionary
  explored.set(`${playerLoc[0]},${playerLoc[1]}`, [-1, -1]); // Add start coordinate to explored dict

  // Explore room
  while (frontier_queue.length > 0) {
    // While frontier isnt empty
    const current: [number, number] = frontier_queue[0]; // Get current from frontier
    frontier_queue.shift(); // And pop first element in frontier

    // Get neighbors from current
    for (let i = 0; i < dir.length; i++) {
      const row: number = current[0] + dir[i][0]; // Row
      const col: number = current[1] + dir[i][1]; // Col

      // If row and col are valid and within the room space, and isnt in explored, and if its tile type floor
      if (
        row >= 0 &&
        col >= 0 &&
        row < room[0].length &&
        col < room.length &&
        !explored.has(`${row},${col}`) &&
        room[row][col][0] == TILE_TYPE.FLOOR &&
        room[row][col][1] == 1
      ) {
        frontier_queue.push([row, col]); // Push [row, col] location to frontier
        explored.set(`${row},${col}`, current); // Add current to explored
        // console.log(explored)
      }
    }
  }
  // console.log(explored)

  // Find path
  const goals: [number, number][] = []; // Intialize goal coordinates

  // Get goal coordinates
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      // If row and col are player location, skip
      if (playerLoc[0] == row && playerLoc[1] == col) {
        continue;
      }

      // If row and col indicate a floor tile, push to goal
      if (room[row][col][0] == TILE_TYPE.FLOOR) {
        goals.push([row, col]);
      }
    }
  }

  for (const goal of goals) {
    // While goal is not empty
    let current: [number, number] = goal; // Set current position as the goal
    const pathway: [number, number][] = []; // Initialize pathway array (from goal to player)

    // Until we reach back to the player location, keep adding to pathway
    while (current[0] !== playerLoc[0] || current[1] !== playerLoc[1]) {
      pathway.push(current); // Push current coordinate to pathway list
      const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
      if (prevPathLocation !== undefined) {
        current = prevPathLocation; // Update new current
      }
    }

    pathway.reverse(); // Reverse order of path from beginning to goal/end

    if (pathway.length / 2 <= AP) {
      path_dict.set(`${goal[0]},${goal[1]}`, pathway);
    }
  }

  return path_dict;
}

export function findPathsFromCurrentLocation(
  playerLoc: [number, number],
  room: [TILE_TYPE, number][][],
  AP: number,
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
): Map<string, [number, number][]> {
  // player_loc is starting coordinate
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [-1, 1], // Up-Right Diagonal
    [-1, -1], // Up-Left Diagonal
    [1, -1], // Down-Left Diagonal
    [1, 1], // Down-Right Diagonal
  ]; // (vertical is tuple[0], horizontal is tuple[1])

  const path_dict = new Map<string, [number, number][]>(); // Initialize path dictionary

  const frontier_queue: [number, number][] = []; // Initialize frontier queue
  frontier_queue.push(playerLoc); // Push start coordinate to frontier

  const explored = new Map<string, [number, number]>(); // Initialize explored dictionary
  explored.set(`${playerLoc[0]},${playerLoc[1]}`, [-1, -1]); // Add start coordinate to explored dict

  // console.log('roomEntityPositions', roomEntityPositions);

  // Explore room
  while (frontier_queue.length > 0) {
    // While frontier isnt empty
    const current: [number, number] | undefined = frontier_queue.shift(); // Get current from frontier

    if (current === undefined) {
      break;
    }

    // Get neighbors from current
    for (let i = 0; i < dir.length; i++) {
      const row: number = current[0] + dir[i][0]; // Row
      const col: number = current[1] + dir[i][1]; // Col

      // If row and col are valid and within the room space, and isnt in explored, and if its tile type floor, and no entity is present,
      // then add to frontier and explored

      if (
        row >= 0 &&
        col >= 0 &&
        row < room.length &&
        col < room.length &&
        explored.has(`${row},${col}`) === false &&
        room[row][col][0] == TILE_TYPE.FLOOR &&
        roomEntityPositions.has(`${row},${col}`) === false
      ) {
        frontier_queue.push([row, col]); // Push [row, col] location to frontier
        explored.set(`${row},${col}`, current); // Add current to explored
        // console.log(explored)
      }
    }
  }
  // console.log(explored)

  // Find path
  const goals: [number, number][] = []; // Intialize goal coordinates

  // Get goal coordinates
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      // If row and col are player location, skip
      if (playerLoc[0] == row && playerLoc[1] == col) {
        continue;
      }

      // If row and col are entity location, skip
      if (roomEntityPositions.has(`${row},${col}`)) {
        continue;
      }

      // If row and col indicate a floor tile, push to goal
      if (room[row][col][0] == TILE_TYPE.FLOOR) {
        goals.push([row, col]);
      }
    }
  }

  for (const goal of goals) {
    // While goal is not empty
    let current: [number, number] = goal; // Set current position as the goal
    const pathway: [number, number][] = []; // Initialize pathway array (from goal to player)

    // Until we reach back to the player location, keep adding to pathway
    while (current[0] !== playerLoc[0] || current[1] !== playerLoc[1]) {
      pathway.push(current); // Push current coordinate to pathway list
      const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
      if (prevPathLocation !== undefined) {
        current = prevPathLocation; // Update new current
      }
    }

    pathway.reverse(); // Reverse order of path from beginning to goal/end

    if (pathway.length / 2 <= AP) {
      path_dict.set(`${goal[0]},${goal[1]}`, pathway);
    }
  }

  return path_dict;
}

export function getApCostForPath(
  paths: Map<string, [number, number][]>
): Map<string, number> {
  const AP = new Map<string, number>();

  for (const key of paths.keys()) {
    const temp = paths.get(key);
    if (temp !== undefined) {
      AP.set(key, Math.round(temp.length / 2));
    }
  }

  return AP;
}

// --------------------------------------------------------------------------------------------------

// Uncomment the following code to test the pathfinding functions

// Initialize the room 2d array
// function initRoom(size: number): [TILE_TYPE, number][][] {
//   const room_arr: [TILE_TYPE, number][][] = new Array(size);

//   for (let i = 0; i < size; i++) {
//     room_arr[i] = [];

//     for (let j = 0; j < size; j++) {
//       room_arr[i][j] = [TILE_TYPE.FLOOR, 1];
//     }
//   }

//   // for (let i = 0; i < size; i++) {
//   //   console.log(room_arr[i]);
//   // }

//   return room_arr;
// }

// const size: number = 5;

// const room: [TILE_TYPE, number][][] = initRoom(size);

// console.log(room);

// const MOCK_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
//   new Map();

// MOCK_ROOM_ENTITY_POSITIONS.set('0,1', [ENTITY_TYPE.ENEMY, 1]);
// MOCK_ROOM_ENTITY_POSITIONS.set('1,1', [ENTITY_TYPE.ENEMY, 2]);
// MOCK_ROOM_ENTITY_POSITIONS.set('2,1', [ENTITY_TYPE.ENEMY, 3]);
// MOCK_ROOM_ENTITY_POSITIONS.set('3,1', [ENTITY_TYPE.ENEMY, 4]);

// const get_path: Map<string, [number, number][]> = findPathsFromCurrentLocation(
//   [0, 0],
//   room,
//   3,
//   MOCK_ROOM_ENTITY_POSITIONS
// );
// const AP: Map<string, number> = getApCostForPath(get_path);
// console.log(get_path);
// console.log(AP);
