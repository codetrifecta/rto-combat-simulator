import { FC, useMemo } from "react";
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
  onClick: () => void;
  classNames?: string;
}> = ({
  tileType,
  // playerState,
  active,
  isEffectZone,
  effectColor,
  onClick,
  classNames = "",
}) => {
  const isEffectTile = useMemo(() => {
    return (
      tileType !== TILE_TYPE.WALL &&
      tileType !== TILE_TYPE.DOOR &&
      tileType !== TILE_TYPE.PLAYER
    );
  }, [tileType]);

  // Effect zone classes
  const effectBorderClasses = useMemo(() => {
    if (isEffectZone && isEffectTile) {
      return `hover:opacity-80 border-${effectColor}-500`;
    }
    return "";
  }, [isEffectZone, isEffectTile, effectColor]);

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

          // Effect zone
          [effectBorderClasses]: isEffectZone && isEffectTile,
        }
      )}
      onClick={onClick}
    ></div>
  );
};
