import { TILE_TYPE } from "./constants";

export const generateRoomMatrix = (roomLength: number) => {
  // Initialize room matrix
  const initialRoomMatrix: [TILE_TYPE, number][][] = Array.from(
    { length: roomLength },
    () => Array.from({ length: roomLength }, () => [TILE_TYPE.EMPTY, 0])
  );

  // Generate room layout
  for (let row = 0; row < roomLength; row++) {
    for (let col = 0; col < roomLength; col++) {
      // Surround room with walls and place door in the middle of the top wall and bottom wall
      if (
        row === 0 ||
        row === roomLength - 1 ||
        col === 0 ||
        col === roomLength - 1
      ) {
        if (col === Math.floor(roomLength / 2)) {
          initialRoomMatrix[row][col] = [TILE_TYPE.DOOR, 1];
        } else {
          initialRoomMatrix[row][col] = [TILE_TYPE.WALL, 1];
        }
      }
      // Place player in the bottom middle
      else if (
        row === Math.floor((roomLength / 4) * 3) &&
        col === Math.floor(roomLength / 2)
      ) {
        initialRoomMatrix[row][col] = [TILE_TYPE.PLAYER, 1];
      }
      // Place two enemies in quadrant 1 and 2
      else if (
        (row === Math.floor(roomLength / 4) &&
          col === Math.floor(roomLength / 4)) ||
        (row === Math.floor(roomLength / 4) &&
          col === Math.floor((roomLength / 4) * 3))
      ) {
        if (col === Math.floor(roomLength / 4)) {
          // initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
        } else {
          initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
        }
      } else {
        // Place walls everywhere else
        initialRoomMatrix[row][col] = [TILE_TYPE.EMPTY, 1];
      }
    }
  }

  // Manually modify room matrix
  // initialRoomMatrix[8][5] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 13x13 room
  initialRoomMatrix[7][4] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 11x11 room

  return initialRoomMatrix;
};
