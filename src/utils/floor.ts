import { IRoomNode } from '../types';

export enum ROOM_TYPE {
  NULL = 0,
  COMMON = 1,
  START = 2,
  BOSS = 3,
  MINIBOSS = 4,
  SHOP = 5,
  INTERMEDIATE = 6,
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
    let rowString = ' ';
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
        // } else if (floor[row][col] == ROOM_TYPE.INTERMEDIATE) {
        //   rowString += '. ';
      } else {
        rowString += 'X ';
      }
    }
    floorString.push(rowString);
  }
  return floorString;
};

/**
 * Function to determine the best path from start to end in a 5x5 grid, given as parameters.
 * @param floor ROOM_TYPE type, 2d 5x5 matrix represemting the floor layout.
 * @param startCoord [number, number] type, start coordinate in order of row -> column.
 * @param goalCoord [number, number] type, goal coordinate in order of row -> column.
 * @param phase number type, determines if the function is finding the path between Start and Boss (1), Start and Intermediate (2),
 *              Intermediate and Boss (3), Intermediate (Path) and Miniboss (4), or Intermediate (Path) and Shop (5)
 */
function generatePath(
  floor: ROOM_TYPE[][],
  startCoord: [number, number],
  goalCoord: [number, number],
  phase: number
) {
  // Initialize directions
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ]; // (vertical is dir[0], horizontal is dir[1])

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
  const goal: [number, number] = goalCoord; // Intialize goal coordinates
  let current: [number, number] = goal; // Set current position as the goal
  // const pathway: [number, number][] = []; // Initialize pathway array (from goal to Start)

  // Start and Intermediate Rooms will always be starting rooms.
  // Boss, Miniboss and Shop Rooms will always be goal rooms.
  // Start will only always connect to either Boss or Intermediate Rooms
  // Intermediate Rooms will only always connect to Boss, Miniboss or Shop rooms.
  switch (phase) {
    // Start Room -> Boss Room
    case 1: {
      // Until we reach back to the Start room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.START) {
        // While current room is not Start room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Start Room -> Intermediate Room
    case 2: {
      // Until we reach back to the Start room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.START) {
        // While current room is not Start room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Intermediate or Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.INTERMEDIATE ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Boss Room
    case 3: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Boss or Start Room
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Miniboss Room
    case 4: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Miniboss, Boss, Start or Shop Room
          floor[current[0]][current[1]] == ROOM_TYPE.MINIBOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.SHOP
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Shop Room
    case 5: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Shop, Miniboss, Start or Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.SHOP ||
          floor[current[0]][current[1]] == ROOM_TYPE.MINIBOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }
  }

  // console.log(floor)
}

/**
 * Function to generate a randomized 5x5 floor path including the Start, Boss, Mini Boss, and Shop rooms as destinations.
 * @param start Boolean, True means start at middle of bottom row (Stages 1 & 3), False means start at middle of middle row (Stage 2).
 * @returns 2D array of ROOM_TYPE
 */
export function generateFloorPlan(start: boolean): ROOM_TYPE[][] {
  // Initialize Floor
  const floor: ROOM_TYPE[][] = new Array(5); // Generate a 5x5 floor matrix
  for (let row = 0; row < 5; row++) {
    // Fill each tile with NULL (0)
    floor[row] = new Array(5).fill(ROOM_TYPE.NULL);
  }

  let startCoord: [number, number];
  let bossCoord: [number, number];
  let intermediateCoord: [number, number];

  // Initialize Start and Boss rooms
  let bossRow = Math.floor(Math.random() * 5);
  const bossCol = Math.floor(Math.random() * 5);
  const stage2Col = Math.floor(Math.random() * 2); // Which column (left or right) the boss will spawn in
  if (start) {
    // Start at middle bottom row, Boss at top row
    floor[4][2] = ROOM_TYPE.START; // Initialize Start
    startCoord = [4, 2];
    floor[0][bossCol] = ROOM_TYPE.BOSS; // Initialize Boss
    bossCoord = [0, bossCol];
  } else {
    // Start at the middle of floor, Boss at side columns
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
      bossCoord = [bossRow, 0];
    } else {
      // Right side
      floor[bossRow][4] = ROOM_TYPE.BOSS;
      bossCoord = [bossRow, 4];
    }
  }
  // console.log(floor);

  // Get path from Start to Boss Room.
  // Get a random boolean to determine existance of Intermediate Room between Start and Boss Rooms.
  const simple: boolean = Boolean(Math.floor(Math.random() * 2));

  if (simple) {
    // If there is no Intermediate Room.
    generatePath(floor, startCoord, bossCoord, 1);
  } else {
    // If there is an Intermediate Room.
    let intermediateRow = Math.floor(Math.random() * 5);
    let intermediateCol = Math.floor(Math.random() * 5);

    // While Intermediate room coordinates overlap with either Start or Boss Rooms, RNG again.
    while (
      floor[intermediateRow][intermediateCol] === ROOM_TYPE.START ||
      floor[intermediateRow][intermediateCol] === ROOM_TYPE.BOSS
    ) {
      intermediateRow = Math.floor(Math.random() * 5);
      intermediateCol = Math.floor(Math.random() * 5);
    }
    floor[intermediateRow][intermediateCol] = ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intermediate Room.
    intermediateCoord = [intermediateRow, intermediateCol];

    generatePath(floor, startCoord, intermediateCoord, 2);
    generatePath(floor, intermediateCoord, bossCoord, 3);
    floor[intermediateRow][intermediateCol] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.
  }

  // Get path from Intermediate to Miniboss Room
  // Determine which rooms are Common Rooms
  const commons: [number, number][] = [];
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor.length; j++) {
      if (floor[i][j] === ROOM_TYPE.COMMON) {
        commons.push([i, j]);
      }
    }
  }

  // Get an Intermediate Room from one of the Common Rooms
  let intermediate = Math.floor(Math.random() * commons.length);
  floor[commons[intermediate][0]][commons[intermediate][1]] =
    ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intermediate Room.
  intermediateCoord = [commons[intermediate][0], commons[intermediate][1]];

  // Initialize Miniboss Room
  let miniBossRow = Math.floor(Math.random() * 5);
  let miniBossCol = Math.floor(Math.random() * 5);
  // NOTE: Rows and Columns will ALWAYS be valid and within floor space.

  // If the Mini Boss row and columns are on either Start, Boss, Common or Intermediate rooms, RNG Miniboss room coordinates again.
  while (
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.START ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.BOSS ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.COMMON ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.INTERMEDIATE
  ) {
    miniBossRow = Math.floor(Math.random() * 5);
    miniBossCol = Math.floor(Math.random() * 5);
  }

  floor[miniBossRow][miniBossCol] = ROOM_TYPE.MINIBOSS;
  const minibossCoord: [number, number] = [miniBossRow, miniBossCol];

  generatePath(floor, intermediateCoord, minibossCoord, 4);
  floor[commons[intermediate][0]][commons[intermediate][1]] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.

  // Get path from Intermediate to Shop Room
  // Determine again which rooms are Common Rooms
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor.length; j++) {
      if (floor[i][j] === ROOM_TYPE.COMMON) {
        commons.push([i, j]);
      }
    }
  }

  // Get an Intermediate Room from one of the Common Rooms
  intermediate = Math.floor(Math.random() * commons.length);
  floor[commons[intermediate][0]][commons[intermediate][1]] =
    ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intermediate Room.
  intermediateCoord = [commons[intermediate][0], commons[intermediate][1]];

  // Initialize Shop Room
  let shopRow = Math.floor(Math.random() * 5);
  let shopCol = Math.floor(Math.random() * 5);
  // NOTE: Rows and Columns will ALWAYS be valid and within floor space.

  // If the Shop row and columns are on either Start, Boss, Miniboss, Common or Intermediate rooms, RNG Shop room coordinates again.
  while (
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.START ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.BOSS ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.MINIBOSS ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.COMMON ||
    floor[miniBossRow][miniBossCol] === ROOM_TYPE.INTERMEDIATE
  ) {
    shopRow = Math.floor(Math.random() * 5);
    shopCol = Math.floor(Math.random() * 5);
  }

  floor[shopRow][shopCol] = ROOM_TYPE.SHOP;
  const shopCoord: [number, number] = [shopRow, shopCol];

  generatePath(floor, intermediateCoord, shopCoord, 5);
  floor[commons[intermediate][0]][commons[intermediate][1]] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.

  // console.log(floor);

  return floor;
}

// TODO: Implement to find adjacent rooms
/**
 * Function to determine the existence of adjacent rooms in
 * @param floor ROOM_TYPE type, 2d 5x5 matrix represemting the floor layout.
 * @returns A 2d 5x5 matrix of IRoomNode type.
 */
export function findAdjacentRooms(floor: ROOM_TYPE[][]): IRoomNode[][] {
  // Initialize directions
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ]; // (vertical is dir[0], horizontal is dir[1])

  // Initialize IRoomNode variable (adjRooms.type is automatically assigned during initialization with the values of 'floor', which is a
  // 'ROOM_TYPE' type)
  const adjRooms: IRoomNode[][] = floor.map((row) =>
    row.map((roomType) => {
      const adjRoom: IRoomNode = {
        type: roomType,
        explored: false,
        eastDoor: false,
        westDoor: false,
        northDoor: false,
        southDoor: false,
      };
      return adjRoom;
    })
  );

  // Check for each room, whether it has adjacent rooms in each cardinal direction.
  for (let row = 0; row < floor.length; row++) {
    for (let col = 0; col < floor.length; col++) {
      // Check Right/East
      if (
        adjRooms[row + dir[0][0]][col + dir[0][1]].type !== ROOM_TYPE.NULL || // The room isn't ROOM_TYPE NULL.
        (row + dir[0][0] >= 0 && // The room to the right/east is within the bounds of the grid
          col + dir[0][1] >= 0 &&
          row + dir[0][0] < floor.length &&
          col + dir[0][1] < floor.length)
      ) {
        adjRooms[row + dir[0][0]][col + dir[0][1]].eastDoor = true;
      }

      // Check Left/West
      if (
        adjRooms[row + dir[1][0]][col + dir[1][1]].type !== ROOM_TYPE.NULL || // The room isn't ROOM_TYPE NULL.
        (row + dir[1][0] >= 0 && // The room to the left/west is within the bounds of the grid
          col + dir[1][1] >= 0 &&
          row + dir[1][0] < floor.length &&
          col + dir[1][1] < floor.length)
      ) {
        adjRooms[row + dir[1][0]][col + dir[1][1]].westDoor = true;
      }

      // Check Down/South
      if (
        adjRooms[row + dir[2][0]][col + dir[2][1]].type !== ROOM_TYPE.NULL || // The room isn't ROOM_TYPE NULL.
        (row + dir[2][0] >= 0 && // The room down/south is within the bounds of the grid
          col + dir[2][1] >= 0 &&
          row + dir[2][0] < floor.length &&
          col + dir[2][1] < floor.length)
      ) {
        adjRooms[row + dir[2][0]][col + dir[2][1]].southDoor = true;
      }

      // Check Up/North
      if (
        adjRooms[row + dir[3][0]][col + dir[3][1]].type !== ROOM_TYPE.NULL || // The room isn't ROOM_TYPE NULL.
        (row + dir[3][0] >= 0 && // The room up/north is within the bounds of the grid
          col + dir[3][1] >= 0 &&
          row + dir[3][0] < floor.length &&
          col + dir[3][1] < floor.length)
      ) {
        adjRooms[row + dir[3][0]][col + dir[3][1]].northDoor = true;
      }

      adjRooms[row][col].explored = true; // Room has been explored.
    }
  }

  // const adjRooms: IRoomNode[][] = Array.from({ length: floor.length }, () =>
  //   Array(floor[0].length).fill({
  //     type: floor[0][0],
  //     explored: false,
  //     eastDoor: false,
  //     westDoor: false,
  //     northDoor: false,
  //     southDoor: false,
  //   })
  // );
  // room.explored = true

  return adjRooms;
}