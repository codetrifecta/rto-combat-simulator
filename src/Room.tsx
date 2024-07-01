import { FC, useState } from "react";
import { Tile } from "./Tile";
import { TILE_SIZE, TILE_TYPE } from "./constants";
import { PlayerState } from "./types";

/**
 * Room
 * 0 - empty
 * 1 - wall
 * 2 - door
 * 3 - player
 * 4 - enemy
 */

const roomLength = 9;
const totalRoomSize = roomLength * TILE_SIZE;

// Initialize room matrix
const initialRoomMatrix: number[][] = Array.from({ length: roomLength }, () =>
  Array.from({ length: roomLength }, () => 0)
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
        initialRoomMatrix[row][col] = TILE_TYPE.DOOR;
      } else {
        initialRoomMatrix[row][col] = TILE_TYPE.WALL;
      }

      console.log("row", row);
    }
    // Place player in the bottom middle
    else if (row === roomLength - 2 && col === Math.floor(roomLength / 2)) {
      initialRoomMatrix[row][col] = TILE_TYPE.PLAYER;
    }
    // Place two enemies in quadrant 1 and 2
    else if (
      (row === Math.floor(roomLength / 4) &&
        col === Math.floor(roomLength / 4)) ||
      (row === Math.floor(roomLength / 4) &&
        col === Math.floor((roomLength / 4) * 3))
    ) {
      initialRoomMatrix[row][col] = TILE_TYPE.ENEMY;
    } else {
      // Place walls everywhere else
      initialRoomMatrix[row][col] = TILE_TYPE.EMPTY;
    }
  }
}

export const Room: FC<{ playerState: PlayerState }> = ({ playerState }) => {
  const [roomMatrix] = useState<TILE_TYPE[][]>(initialRoomMatrix);

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
        return row.map((tile, columnIndex) => {
          // console.log(tile);
          switch (tile) {
            case 0:
              return (
                <Tile
                  tileType={tile}
                  key={`${rowIndex}-${columnIndex}`}
                  playerState={playerState}
                />
              );
            case 1:
              return (
                <Tile
                  tileType={tile}
                  key={`${rowIndex}-${columnIndex}`}
                  playerState={playerState}
                />
              );
            case 2:
              return (
                <Tile
                  tileType={tile}
                  key={`${rowIndex}-${columnIndex}`}
                  playerState={playerState}
                />
              );
            case 3:
              return (
                <Tile
                  tileType={tile}
                  key={`${rowIndex}-${columnIndex}`}
                  playerState={playerState}
                />
              );
            case 4:
              return (
                <Tile
                  tileType={tile}
                  key={`${rowIndex}-${columnIndex}`}
                  playerState={playerState}
                />
              );
            default:
              return null;
          }
        });
      })}
    </div>
  );
};
