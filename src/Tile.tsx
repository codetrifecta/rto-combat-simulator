import { FC } from "react";
import { TILE_SIZE } from "./constants";
import clsx from "clsx";
import { PlayerState } from "./types";

const className = `border-2 border-gray hover:border-black cursor-pointer `;

/**
 * Room
 * 0 - empty
 * 1 - wall
 * 2 - door
 * 3 - player
 * 4 - enemy
 */

export const Tile: FC<{
  tileType: number;
  playerState: PlayerState;
  classNames?: string;
}> = ({ tileType, playerState, classNames = "" }) => {
  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx(className, classNames, {
        "bg-white": tileType === 0,
        "bg-gray-500": tileType === 1,
        "bg-yellow-500": tileType === 2,
        "bg-green-500": tileType === 3,
        "bg-red-500": tileType === 4,
        "hover:bg-red-500": playerState.isAttacking,
        "hover:bg-blue-500": playerState.isMoving,
      })}
    ></div>
  );
};
