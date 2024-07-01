import { FC } from "react";
import { TILE_SIZE, TILE_TYPE } from "./constants";
import clsx from "clsx";
import { PlayerState } from "./types";

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
  isEffectZone: boolean;
  effectColor: string;
  classNames?: string;
}> = ({
  tileType,
  playerState,
  active,
  isEffectZone,
  effectColor,
  classNames = "",
}) => {
  const isEffectTile =
    tileType !== TILE_TYPE.WALL &&
    tileType !== TILE_TYPE.DOOR &&
    tileType !== TILE_TYPE.PLAYER;

  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx(
        "border-2 border-gray hover:border-black cursor-pointer",
        classNames,
        {
          // Tile type color
          "bg-white": tileType === TILE_TYPE.EMPTY,
          "bg-gray-500": tileType === TILE_TYPE.WALL,
          "bg-yellow-500": tileType === TILE_TYPE.DOOR,
          "bg-green-500": tileType === TILE_TYPE.PLAYER,
          "bg-red-500": tileType === TILE_TYPE.ENEMY,

          // Active tile
          "shadow-intense-green z-10": tileType === TILE_TYPE.PLAYER && active,
          "shadow-intense-red z-10": tileType === TILE_TYPE.ENEMY && active,

          // Attack effect zone
          [`border-${effectColor}-500`]: isEffectZone && isEffectTile,
          [`hover:bg-red-300 hover:border-${effectColor}-500`]:
            playerState.isAttacking && isEffectZone && isEffectTile,

          // Move effect zone
          "hover:bg-blue-500": playerState.isMoving,
          [`hover:bg-blue-300 hover:border-${effectColor}-500`]:
            playerState.isMoving && isEffectZone && isEffectTile,
        }
      )}
    ></div>
  );
};
