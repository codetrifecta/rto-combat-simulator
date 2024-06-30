import { FC } from "react";
import { Tile } from "./Tile";
import { TILE_SIZE } from "./constants";
import { PlayerState } from "./types";

/**
 * Room
 * 0 - empty
 * 1 - wall
 * 2 - door
 * 3 - player
 * 4 - enemy
 */

const roomLength = 7;
const totalRoomSize = roomLength * TILE_SIZE;

// Initialize room matrix
const roomMatrix: number[][] = Array.from({ length: roomLength }, () =>
  Array.from({ length: roomLength }, () => 0)
);

console.log("pre", roomMatrix);

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
        roomMatrix[row][col] = 2;
      } else {
        roomMatrix[row][col] = 1;
      }

      console.log("row", row);
    }
    // Place player in the bottom middle
    else if (row === roomLength - 2 && col === Math.floor(roomLength / 2)) {
      roomMatrix[row][col] = 3;
    }
    // Place enemy in the top middle
    else if (row === 1 && col === Math.floor(roomLength / 2)) {
      roomMatrix[row][col] = 4;
    } else {
      // Place walls everywhere else
      roomMatrix[row][col] = 0;
    }
  }
}

console.log("post", roomMatrix);

export const Room: FC<{ playerState: PlayerState }> = ({ playerState }) => {
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
