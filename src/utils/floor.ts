export enum ROOM_TYPE {
  NULL = -1,
  COMMON = 0,
  START = 1,
  BOSS = 2,
  MINIBOSS = 3,
  SHOP = 4,
}

/**
 * Convert a floor to a string array representation.
 * @param floor 2D array of ROOM_TYPE representing the room
 * @returns String array of the floor where
 *          null rooms are represented by '#',
 *          common rooms are represented by '.',
 *          start room is represented by 'S',
 *          boss room is represented by 'B',
 *          miniboss room is represented by 'M',
 *          shop room is represented by '$',
 *          and all other rooms are represented by 'X',
 *          each separated by a space.
 */
export const floorToStringArray = (floor: ROOM_TYPE[][]): string[] => {
  const floorString: string[] = [];
  for (let row = 0; row < floor.length; row++) {
    let rowString = '';
    for (let col = 0; col < floor[row].length; col++) {
      if (floor[row][col] == ROOM_TYPE.NULL) {
        rowString += '# ';
      } else if (floor[row][col] == ROOM_TYPE.COMMON) {
        rowString += '. ';
      } else if (floor[row][col] == ROOM_TYPE.START) {
        rowString += 'S ';
      } else if (floor[row][col] == ROOM_TYPE.BOSS) {
        rowString += 'B ';
      } else if (floor[row][col] == ROOM_TYPE.MINIBOSS) {
        rowString += 'M ';
      } else if (floor[row][col] == ROOM_TYPE.SHOP) {
        rowString += '$ ';
      } else {
        rowString += 'X ';
      }
    }
    floorString.push(rowString);
  }
  return floorString;
};

/**
 * Function to generate a randomized 5x5 floor path including the Start, Boss, Mini Boss, and Shop rooms as destinations.
 * @param start Boolean, True means start at middle of bottom row (Stages 1 & 3), False means start at middle of middle row (Stage 2).
 * @returns 2D array of ROOM_TYPE
 */
export function generateFloorPlan(start: boolean): ROOM_TYPE[][] {
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ]; // (vertical is dir[0], horizontal is dir[1])

  // Initialize Floor
  const floor: ROOM_TYPE[][] = new Array(5); // Generate a 5x5 floor matrix
  for (let row = 0; row < 5; row++) {
    // Fill each tile with NULL (-1)
    floor[row] = new Array(5).fill(ROOM_TYPE.NULL);
  }

  let startCoord: [number, number];

  // Initialize Start and Boss rooms
  let bossRow = Math.floor(Math.random() * 5);
  const bossCol = Math.floor(Math.random() * 5);
  const stage2Col = Math.floor(Math.random() * 2);
  if (start) {
    // Start at middle bottom, Boss at top row
    floor[4][2] = ROOM_TYPE.START; // Initialize Start
    startCoord = [4, 2];
    floor[0][bossCol] = ROOM_TYPE.BOSS; // Initialize Boss
  } else {
    // Start at the middle in middle row, Boss at side columns
    // Initialize Start
    floor[2][2] = ROOM_TYPE.START;
    startCoord = [2, 2];

    // Initialize Boss
    while (bossRow == 2) {
      // If Boss room is directly two tiles to the left or right of Start, rng again
      bossRow = Math.floor(Math.random() * 5);
    }

    if (stage2Col == 0) {
      // Left side
      floor[bossRow][0] = ROOM_TYPE.BOSS;
    } else {
      // Right side
      floor[bossRow][4] = ROOM_TYPE.BOSS;
    }
  }
  // console.log(floor);

  // Initialize Mini Boss and Shop rooms
  let miniBossRow = Math.floor(Math.random() * 5);
  let miniBossCol = Math.floor(Math.random() * 5);
  let shopRow = Math.floor(Math.random() * 5);
  let shopCol = Math.floor(Math.random() * 5);
  // NOTE: Rows and Columns will ALWAYS be valid and within floor space.

  // If the Mini Boss row and columns are on either Start or Boss rooms, RNG Mini Boss room coordinates again.
  while (
    !(
      floor[miniBossRow][miniBossCol] != ROOM_TYPE.START &&
      floor[miniBossRow][miniBossCol] != ROOM_TYPE.BOSS
    )
  ) {
    miniBossRow = Math.floor(Math.random() * 5);
    miniBossCol = Math.floor(Math.random() * 5);
  }
  floor[miniBossRow][miniBossCol] = ROOM_TYPE.MINIBOSS;

  // If the Shop row and columns are on either Start, Boss or Mini Boss rooms, RNG Shop room coordinates again.
  while (
    !(
      floor[shopRow][shopCol] != ROOM_TYPE.START &&
      floor[shopRow][shopCol] != ROOM_TYPE.BOSS &&
      floor[shopRow][shopCol] != ROOM_TYPE.MINIBOSS
    )
  ) {
    shopRow = Math.floor(Math.random() * 5);
    shopCol = Math.floor(Math.random() * 5);
  }
  floor[shopRow][shopCol] = ROOM_TYPE.SHOP;
  // console.log(floor);

  // Initialize frontier queue
  const frontier_queue: [number, number][] = [];
  frontier_queue.push(startCoord); // Push start coordinate to frontier

  // Initialize explored dictionary
  const explored = new Map<string, [number, number]>();
  explored.set(`${startCoord[0]},${startCoord[1]}`, [-1, -1]); // Add start coordinate to explored dict

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

      // If row and col are valid and within the floor space, and isnt in explored, then add to frontier and explored
      if (
        row >= 0 &&
        col >= 0 &&
        row < floor.length &&
        col < floor.length &&
        explored.has(`${row},${col}`) === false
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
  goals.push([miniBossRow, miniBossCol]);
  goals.push([shopRow, shopCol]);
  if (start) {
    // Stage 1 or 3
    goals.push([0, bossCol]);
  } else {
    // Stage 2
    if (stage2Col == 0) {
      // Left column
      goals.push([bossRow, 0]);
    } else {
      // Right column
      goals.push([bossRow, 4]);
    }
  }

  for (const goal of goals) {
    // While goal is not empty
    let current: [number, number] = goal; // Set current position as the goal
    // const pathway: [number, number][] = []; // Initialize pathway array (from goal to Start)

    // Until we reach back to the Start room, keep adding to pathway
    while (floor[current[0]][current[1]] !== ROOM_TYPE.START) {
      // While current room is not Start room
      // pathway.push(current); // Push current coordinate to pathway list
      if (
        // Ignore if current room is Boss, Mini Boss or Shop rooms
        floor[current[0]][current[1]] == ROOM_TYPE.BOSS ||
        floor[current[0]][current[1]] == ROOM_TYPE.MINIBOSS ||
        floor[current[0]][current[1]] == ROOM_TYPE.SHOP
      ) {
        continue;
      } else {
        floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (intermediate between Start, Boss, Mini Boss and Shop rooms)
      }

      const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
      if (prevPathLocation !== undefined) {
        current = prevPathLocation; // Update new current
      }
    }
    // pathway.reverse(); // Reverse order of path from beginning to goal/end
  }
  // console.log(floor)

  return floor;
}
