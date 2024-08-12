import { TILE_TYPE } from '../constants/tile';

// Function to cast a ray from the current position in a specific direction based on angle input in radians (angleRad)
// Takes in the room, current position (locRow and locCol), and the max distance of the skill (skillDistance)
// NOTE: angle rad/deg = 0, is south direction and turns counterclockwise.
function castRayAtAngle(
  room: [TILE_TYPE, number][][],
  startRow: number,
  startCol: number,
  angleRad: number,
  skillRadius: number
): boolean[][] {
  // Initialize a boolean array of size room and fill with false.
  const visibleTiles: boolean[][] = Array.from({ length: room.length }, () =>
    Array(room[0].length).fill(false)
  );

  // Get the direction vector based on the angle to increment the ray length
  const dRow = Math.cos(angleRad);
  const dCol = Math.sin(angleRad);

  // Start ray from the center of the tile of starting location
  let rayRow = startRow + 0.5;
  let rayCol = startCol + 0.5;

  // Iterate through each tile in one direction (based on angleRad) over the skill distance
  for (let tile = 0; tile < skillRadius; tile++) {
    // Get current location row and colum and revert from float to integer, rounded down
    const currentRow = Math.floor(rayRow);
    const currentCol = Math.floor(rayCol);

    // If the current row and column are NOT valid, and the current tile is NOT within the bounds of the room, break
    if (
      !(
        currentRow >= 0 &&
        currentCol >= 0 &&
        currentRow < room.length &&
        currentCol < room[0].length
      )
    ) {
      break;
    }

    visibleTiles[currentRow][currentCol] = true; // Set the current tile as visible

    // If the current tile is a wall, break
    if (room[currentRow][currentCol][0] == TILE_TYPE.WALL) {
      break;
    }

    // Increment the ray length in the direction of the direction vector
    rayRow += dRow;
    rayCol += dCol;
  }

  return visibleTiles;
}

// Function to determine which tiles from startLoc (player or enemy) are valid for skill range (skillDistance).
// numRays is the number of rays to cast (default 360)
// NOTE: angle rad/deg = 0, is south direction and turns counterclockwise.
export function visionForSkills(
  room: [TILE_TYPE, number][][],
  startLoc: [number, number],
  numRays: number,
  skillRadius: number
): boolean[][] {
  // Initialize a boolean array of size room and fill with false.
  const validTiles: boolean[][] = Array.from({ length: room.length }, () =>
    Array(room[0].length).fill(false)
  );
  const [startRow, startCol] = startLoc; // Get startLoc row and column seperately

  // Cast rays in all directions (deg = 0 to numRays in intervals of 1 deg)
  for (let angleDeg = 0; angleDeg < numRays; angleDeg++) {
    const angleRad = angleDeg * ((2 * Math.PI) / numRays); // Get angle from deg to radians
    const rayValidTiles = castRayAtAngle(
      room,
      startRow,
      startCol,
      angleRad,
      skillRadius
    ); // Get grid of size room filled with true/false

    // Combine the rayValidTile maps from each ray into validTiles
    for (let row = 0; row < room.length; row++) {
      for (let col = 0; col < room[0].length; col++) {
        if (rayValidTiles[row][col]) {
          validTiles[row][col] = true;
        }
      }
    }
  }

  validTiles[startRow][startCol] = true; // Set start position as always visible (in case)

  return validTiles;
}

// ------------------------------------------------------------------------------------------------------------------------------

// enum TILE_TYPE {
//     NULL = -1,
//     FLOOR = 0,
//     WALL = 1,
//     DOOR = 2,
//   }

//   const room: [TILE_TYPE, number][][] = [
//     [[TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1]],
//     [[TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1]],
//     [[TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1]],
//     [[TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1]],
//     [[TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1]]
//   ]

//   /*
//   [
//     [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
//     [[0, 1], [1, 1], [0, 1], [1, 1], [0, 1]],
//     [[0, 1], [1, 1], [0, 1], [1, 1], [0, 1]],
//     [[0, 1], [0, 1], [1, 1], [0, 1], [0, 1]],
//     [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]
//   ]

//   [
//     [.  .  .  .  .],
//     [.  #  .  #  .],
//     [.  #  @  #  .],
//     [.  .  #  .  .],
//     [.  .  .  .  .]
//   ]
//   */

//   console.log(room)

//   const startLoc: [number, number] = [2, 2];
//   const numRays = 360; // Number of rays (1 degree interval), default 360
//   const skillRadius = 5; // Skill radius distance

//   const validityMap = visionForSkills(room, startLoc, numRays, skillRadius);
//   console.log(validityMap)

//   // Output the grid
//   for (let i = 0; i < room.length; i++) {
//     let row = '[ ';
//     for (let j = 0; j < room[i].length; j++) {
//       if (validityMap[i][j]) { // If the tile is visible
//         if (room[i][j][0] == TILE_TYPE.FLOOR){ // If the tile is a floor
//           row += '. ';
//         }
//         else { // If the tile is a wall
//           row += '# ';
//         }
//       } else { // If the tile is not visible
//         row += 'X '
//       }
//     }
//     row += ']';
//     console.log(row)
//   }

// Expected grid
/*
  [
    [X  .  .  .  X],
    [X  #  .  #  X],
    [X  #  @  #  X],
    [.  .  #  .  .],
    [.  .  X  .  .]
  ]
  */
