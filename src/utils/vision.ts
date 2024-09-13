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
  room: TILE_TYPE[][],
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
  for (let tile = 0; tile <= skillRadius + 3; tile++) {
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
          currentRow < room.length && // Current row is within the room bounds
          currentCol < room[0].length && // Current column is within the room bounds
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
    if (
      room[currentRow][currentCol] === TILE_TYPE.WALL ||
      room[currentRow][currentCol] === TILE_TYPE.OBSTACLE
    ) {
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
 * @param numRays - The number of rays set to cover in 360 degrees (default 40 rays)
 * @returns A boolean grid of size room, with the tiles the entity (player/enemy) can "see" having true and the ones they can't having false for the entire room.
 */
export function getVisionFromEntityPosition(
  room: TILE_TYPE[][],
  startLoc: [number, number],
  skillRadius: number,
  roomEntityPositions: Map<string, [ENTITY_TYPE, number]>,
  numRays: number = 40
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
