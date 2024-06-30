import { FC } from "react";
import { Tile } from "./Tile";
import { TILE_SIZE } from "./constants";
import { PlayerState } from "./types";

const roomLength = 7;
const totalRoomSize = roomLength * TILE_SIZE;
const roomMatrix: number[][] = Array.from({ length: roomLength }, () => {
  return Array.from({ length: roomLength }, () => 0);
});

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
      // className={gridContainerClassName}
    >
      {roomMatrix.map((row, rowIndex) => {
        return row.map((tile, columnIndex) => {
          return (
            <Tile
              key={rowIndex + "+" + columnIndex}
              playerState={playerState}
            />
          );
        });
      })}
    </div>
  );
};
