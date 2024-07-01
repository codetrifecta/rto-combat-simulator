import { FC } from "react";
import { TILE_SIZE, TILE_TYPE } from "./constants";
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
  active: boolean;
  classNames?: string;
}> = ({ tileType, playerState, active, classNames = "" }) => {
  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx(className, classNames, {
        "bg-white": tileType === TILE_TYPE.EMPTY,
        "bg-gray-500": tileType === TILE_TYPE.WALL,
        "bg-yellow-500": tileType === TILE_TYPE.DOOR,
        "bg-green-500": tileType === TILE_TYPE.PLAYER,
        "bg-red-500": tileType === TILE_TYPE.ENEMY,
        "hover:border-red-500": playerState.isAttacking,
        "hover:border-blue-500": playerState.isMoving,
        "shadow-intense-green z-10": tileType === TILE_TYPE.PLAYER && active,
        "shadow-intense-red z-10": tileType === TILE_TYPE.ENEMY && active,
      })}
    ></div>
  );
};
