enum TILE_TYPE {
  NULL = -1,
  FLOOR = 0,
  WALL = 1,
  DOOR = 2,
}

// Initialize the room 2d array
function init_room(size: number): [TILE_TYPE, number][][] {
  const room_arr: [TILE_TYPE, number][][] = new Array(size);

  for (let i = 0; i < size; i++) {
    room_arr[i] = [];

    for (let j = 0; j < size; j++) {
      room_arr[i][j] = [TILE_TYPE.FLOOR, 1];
    }
  }

  // for (let i = 0; i < size; i++) {
  //   console.log(room_arr[i]);
  // }

  return room_arr;
}

const size: number = 5;

const room: [TILE_TYPE, number][][] = init_room(size);

console.log(room);

// --------------------------------------------------------------------------------------------------

// Funciton to find a path taking in the tuple of current player location, the room state, and the path dictionary to be filled, given current AP
export function findPathsFromCurrentLocation(
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
  explored.set(`${playerLoc[0]},${playerLoc[1]}`, [-1, -1]) // Add start coordinate to explored dict

  // Explore room
  while (frontier_queue.length > 0) {
    // While frontier isnt empty
    const current: [number, number] = frontier_queue[0]; // Get current from frontier
    frontier_queue.shift(); // And pop first element in frontier

    // Get neighbors from current
    for (let i = 0; i < dir.length; i++) {
      const a: number = current[0] + dir[i][0]; // Row
      const b: number = current[1] + dir[i][1]; // Col

      // If a and b are valid and within the room space, and isnt in explored, and if its tile type floor
      if (
        a >= 0 &&
        b >= 0 &&
        a < room[0].length &&
        b < room.length &&
        !explored.has(`${a},${b}`) &&
        room[a][b][0] == TILE_TYPE.FLOOR &&
        room[a][b][1] == 1
      ) {
        frontier_queue.push([a, b]); // Push [a, b] location to frontier
        explored.set(`${a},${b}`, current) // Add current to explored
        // console.log(explored)
      }
    }
  }
  // console.log(explored)

  // Find path
  const goal: [number, number][] = []; // Intialize goal coordinates

  // Get goal coordinates
  for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[0].length; j++) {
      if (playerLoc[0] == i && playerLoc[1] == j) {
        continue;
      }
      if (room[i][j][0] == TILE_TYPE.FLOOR && room[i][j][1] == 1) {
        goal.push([i, j]);
      }
    }
  }
  // console.log(goal[0][1])

  while (goal.length > 0) {
    // While goal is not empty
    let current: [number, number] = goal[0]; // Set current position as the goal
    const key: [number, number] = goal[0];
    goal.shift(); // Pop the first element in goal

    const pathway: [number, number][] = []; // Initialize pathway array
    while (current != playerLoc) {
      // Until we reach back to the beginning
      pathway.push(current); // Push current coordinate to pathway list
      if (current.length > 1) {
        const temp = explored.get(`${current[0]},${current[1]}`)
        if (temp !== undefined) {
          current = temp // Update new current
        }
      }
    }
    pathway.reverse(); // Reverse order of path from beginning to goal/end

    if (pathway.length / 2 <= AP) {
      path_dict.set(`${key[0]},${key[1]}`, pathway)
    }
  }

  return path_dict;
}

export function getApCostForPath(paths: Map<string, [number, number][]>): Map<string, number> {
  const AP = new Map<string, number>();

  for (const key of paths.keys()) {
    const temp = paths.get(key)
    if (temp !== undefined) {
      AP.set(key, temp.length)
    }
  }

  return AP;
}

// --------------------------------------------------------------------------------------------------

const get_path: Map<string, [number, number][]> = findPathsFromCurrentLocation([0, 0], room, 3);
const AP: Map<string, number> = getApCostForPath(get_path);
console.log(get_path);
console.log(AP);
