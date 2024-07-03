import { FC, useMemo } from "react";
import { TILE_SIZE, TILE_TYPE } from "../constants";
import clsx from "clsx";
import { IPlayerState } from "../types";

export const Tile: FC<{
  tileType: number;
  playerState: IPlayerState;
  active: boolean;
  isEffectZone: boolean;
  effectColor: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  classNames?: string;
}> = ({
  tileType,
  playerState,
  active,
  isEffectZone,
  onClick,
  onMouseEnter,
  onMouseLeave,
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
  // Return flat string instead of formatted because getting an error where class is not applied
  const effectBorderClasses = useMemo(() => {
    if (isEffectZone && isEffectTile) {
      if (playerState.isAttacking) {
        return "hover:opacity-80 border-red-500";
      }
    }
    return "";
  }, [isEffectZone, isEffectTile, playerState.isAttacking]);

  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx(
        "relative border-2 border-gray hover:border-black cursor-pointer",
        classNames,
        {
          // Tile type color
          "bg-white": tileType === TILE_TYPE.EMPTY,
          "bg-gray-500": tileType === TILE_TYPE.WALL,
          "bg-yellow-500": tileType === TILE_TYPE.DOOR,
          "bg-green-500 z-10 hover:shadow-intense-green":
            tileType === TILE_TYPE.PLAYER,
          "bg-red-500 z-10 hover:shadow-intense-red":
            tileType === TILE_TYPE.ENEMY,

          // Active tile
          "shadow-intense-green z-10": tileType === TILE_TYPE.PLAYER && active,
          "shadow-intense-red z-10": tileType === TILE_TYPE.ENEMY && active,

          // Effect zone
          [effectBorderClasses]: isEffectZone && isEffectTile,
        }
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
  );
};
