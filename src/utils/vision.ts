import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

/**
 * Helper function to cast a ray from the current position in a specific (one) direction based on angle input in radians (angleRad).
 * NOTE: angle rad/deg = 0, is south direction and turns counterclockwise.
 * @param room - 2D matrix of type [TILE_TYPE, number][][]
 * @param startRow - The starting row of the player/enemy in the room
 * @param startCol - The starting column of the player/enemy in the room
 * @param angleRad - The angle at which the ray is being cast (in radians)
 * @param skillRadius - The range of the skill set for maximum distance to cast ray
 * @param roomEntityPositions - The location of any enities in the room (player/enemy), of type Map<string, [ENTITY_TYPE, number]>
 * @returns A boolean grid of size room, with the tiles the entity (player/enemy) can "see" having true and the ones they can't having false, in the direction set by angleRad.
 */
function castRayAtAngle(
  room: [TILE_TYPE, number][][],
  startRow: number,
  startCol: number,
  angleRad: number,
  skillRadius: number,
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>
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
  for (let tile = 0; tile <= skillRadius + 1; tile++) {
    // Get current location row and colum and revert from float to integer, rounded down
    const currentRow = Math.floor(rayRow);
    const currentCol = Math.floor(rayCol);

    // If current row and column is the starting location, increment ray length and continue
    if (currentRow === startRow && currentCol === startCol) {
      rayRow += dRow;
      rayCol += dCol;
      continue;
    }

    // If the current row and column are NOT valid, and the current tile is NOT within the bounds of the skill radius, break
    if (
      !(
        (
          currentRow >= 0 &&
          currentCol >= 0 &&
          currentRow <= startRow + skillRadius && // Current row is between startRow +- skillRadius
          currentRow >= startRow - skillRadius && // Current row is between startRow +- skillRadius
          currentCol <= startCol + skillRadius && // Current column is between startRow +- skillRadius
          currentCol >= startCol - skillRadius
        ) // Current column is between startRow +- skillRadius
      )
    ) {
      break;
    }

    visibleTiles[currentRow][currentCol] = true; // Set the current tile as visible

    // If the current tile is a wall, break
    if (room[currentRow][currentCol][0] === TILE_TYPE.WALL) {
      break;
    } else {
      // If current tile is a floor but has an entity
      if (roomEntityPositions.has(`${currentRow},${currentCol}`)) {
        break;
      }
    }

    // Increment the ray length in the direction of the direction vector
    rayRow += dRow;
    rayCol += dCol;
  }

  return visibleTiles;
}

/**
 * Function to determine which tiles from startLoc (player or enemy) are valid for skill range (skillDistance).
 * NOTE: angle rad/deg = 0, is south direction and turns counterclockwise.
 * @param room - 2D matrix of type [TILE_TYPE, number][][]
 * @param startLoc - The starting location of the player/enemy in the room
 * @param skillRadius - The range of the skill set for maximum distance to cast ray
 * @param roomEntityPositions - The location of any enities in the room (player/enemy), of type Map<string, [ENTITY_TYPE, number]>
 * @param numRays - The number of rays set to cover in 360 degrees (default 360 deg for 1 deg intervals)
 * @returns A boolean grid of size room, with the tiles the entity (player/enemy) can "see" having true and the ones they can't having false for the entire room.
 */
export function getVisionFromEntityPosition(
  room: [TILE_TYPE, number][][],
  startLoc: [number, number],
  skillRadius: number,
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>,
  numRays: number = 360
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
      skillRadius,
      roomEntityPositions
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
//   NULL = -1,
//   FLOOR = 0,
//   WALL = 1,
//   DOOR = 2,
// }

// const room: [TILE_TYPE, number][][] = [
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.WALL, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.WALL, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.WALL, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.WALL, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.WALL, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
// ];

// // Room with all floors
// const room: [TILE_TYPE, number][][] = [
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
//   [
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//     [TILE_TYPE.FLOOR, 1],
//   ],
// ];

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

// console.log(room);

// const startLoc: [number, number] = [2, 2];
// const numRays = 360; // Number of rays (1 degree interval), default 360
// const skillRadius = 5; // Skill radius distance

// const MOCK_ROOM_ENTITY_POSITIONS = new Map<string, [ENTITY_TYPE, number]>();
// MOCK_ROOM_ENTITY_POSITIONS.set(`${startLoc[0]},${startLoc[1]}`, [
//   ENTITY_TYPE.PLAYER,
//   1,
// ]);
// MOCK_ROOM_ENTITY_POSITIONS.set(`1,2`, [ENTITY_TYPE.ENEMY, 1]);
// MOCK_ROOM_ENTITY_POSITIONS.set(`3,1`, [ENTITY_TYPE.ENEMY, 1]);

// const validityMap = getVisionFromEntityPosition(
//   room,
//   startLoc,
//   skillRadius,
//   MOCK_ROOM_ENTITY_POSITIONS,
//   numRays
// );
// console.log('validityMap\n', validityMap);

// // Output the grid
// for (let i = 0; i < room.length; i++) {
//   let row = '[ ';
//   for (let j = 0; j < room[i].length; j++) {
//     if (validityMap[i][j]) {
//       // If the tile is visible
//       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//         // If the tile is a floor
//         row += '. ';
//       } else {
//         // If the tile is a wall
//         row += '# ';
//       }
//     } else {
//       // If the tile is not visible
//       row += 'X ';
//     }
//   }
//   row += ']';
//   console.log(row);
// }

// // Expected grid
// /*
//   [
//     [X  .  .  .  X],
//     [X  #  .  #  X],
//     [X  #  @  #  X],
//     [.  .  #  .  .],
//     [.  .  X  .  .]
//   ]
//   */
