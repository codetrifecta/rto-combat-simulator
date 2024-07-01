import { FC, useState } from "react";
import { Tile } from "./Tile";
import { ENTITY_TYPE, TILE_SIZE, TILE_TYPE } from "./constants";
import { GameState, PlayerState } from "./types";

/**
 * Room
 * 0 - empty
 * 1 - wall
 * 2 - door
 * 3 - player
 * 4 - enemy
 */

// Seems like ideal room size is AT LEAST 9x9
const roomLength = 9;
const totalRoomSize = roomLength * TILE_SIZE;

// Initialize room matrix
const initialRoomMatrix: [TILE_TYPE, number][][] = Array.from(
  { length: roomLength },
  () => Array.from({ length: roomLength }, () => [TILE_TYPE.EMPTY, 0])
);

console.log("pre", initialRoomMatrix);

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

      console.log("row", row);
    }
    // Place player in the bottom middle
    else if (row === roomLength - 2 && col === Math.floor(roomLength / 2)) {
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
        initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
      } else {
        initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 2];
      }
    } else {
      // Place walls everywhere else
      initialRoomMatrix[row][col] = [TILE_TYPE.EMPTY, 1];
    }
  }
}

// Manually modify room matrix
// initialRoomMatrix[2][2] = [TILE_TYPE.ENEMY, 1];
// initialRoomMatrix[2][4] = [TILE_TYPE.ENEMY, 2];

export const Room: FC<{ gameState: GameState; playerState: PlayerState }> = ({
  gameState,
  playerState,
}) => {
  const [roomMatrix] = useState<[TILE_TYPE, number][][]>(initialRoomMatrix);

  console.log("roomMatrix", roomMatrix);

  return (
    <div
      style={{
        width: totalRoomSize,
        height: totalRoomSize,
        display: "grid",
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
      }}
    >
      {roomMatrix.map((row, rowIndex) => {
        return row.map(([tileType, id], columnIndex) => {
          // Parse tile type to entity type
          let entityType: ENTITY_TYPE | null;
          if (tileType === TILE_TYPE.PLAYER) {
            entityType = ENTITY_TYPE.PLAYER;
          } else if (tileType === TILE_TYPE.ENEMY) {
            entityType = ENTITY_TYPE.ENEMY;
          } else {
            entityType = null;
          }

          // Check if tile is active (i.e. it's the entity's turn)
          let active: boolean = false;
          if (
            entityType !== null &&
            gameState.turnCycle[0][0] === entityType &&
            gameState.turnCycle[0][1] === id
          ) {
            active = true;
          }

          return (
            <Tile
              tileType={tileType}
              key={`${rowIndex}-${columnIndex}`}
              playerState={playerState}
              active={active}
            />
          );
        });
      })}
    </div>
  );
};
