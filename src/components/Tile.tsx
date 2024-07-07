import { FC, useMemo } from "react";
import { TILE_SIZE, TILE_TYPE } from "../constants";
import clsx from "clsx";
import { IPlayerState } from "../types";

export const Tile: FC<{
  tileType: number;
  playerState: IPlayerState;
  active: boolean;
  isEffectZone: boolean;
  isRoomOver: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  classNames?: string;
}> = ({
  tileType,
  playerState,
  active,
  isEffectZone,
  isRoomOver,
  onClick,
  onMouseEnter,
  onMouseLeave,
  classNames = "",
}) => {
  const isAttackEffectTile = useMemo(() => {
    return (
      tileType !== TILE_TYPE.WALL &&
      tileType !== TILE_TYPE.DOOR &&
      tileType !== TILE_TYPE.PLAYER
    );
  }, [tileType]);

  const isMovingEffectTile = useMemo(() => {
    if (isRoomOver) {
      // Player can move to the door when the room is over (door restriction is lifted)
      return (
        tileType !== TILE_TYPE.WALL &&
        tileType !== TILE_TYPE.PLAYER &&
        tileType !== TILE_TYPE.ENEMY
      );
    } else {
      return (
        tileType !== TILE_TYPE.WALL &&
        tileType !== TILE_TYPE.DOOR &&
        tileType !== TILE_TYPE.PLAYER &&
        tileType !== TILE_TYPE.ENEMY
      );
    }
  }, [isRoomOver, tileType]);

  const isSkillEffectTile = useMemo(() => {
    return tileType !== TILE_TYPE.WALL && tileType !== TILE_TYPE.DOOR;
  }, [tileType]);

  // Effect zone classes
  // Return flat string instead of formatted because getting an error where class is not applied
  const effectBorderClasses = useMemo(() => {
    if (isEffectZone) {
      if (playerState.isAttacking && isAttackEffectTile) {
        return "hover:opacity-80 border-red-500";
      } else if (playerState.isMoving && isMovingEffectTile) {
        return "hover:opacity-80 border-blue-500";
      } else if (playerState.isUsingSkill && isSkillEffectTile) {
        return "hover:opacity-80 !border-yellow-500";
      }
    }
    return "";
  }, [
    isEffectZone,
    playerState.isAttacking,
    playerState.isMoving,
    playerState.isUsingSkill,
    isAttackEffectTile,
    isMovingEffectTile,
    isSkillEffectTile,
  ]);

  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx("relative border-2 border-gray ", classNames, {
        // Only use cursor-pointer non-wall tiles (and door tiles if room is over)
        "cursor-pointer":
          (tileType !== TILE_TYPE.WALL && tileType !== TILE_TYPE.DOOR) ||
          (tileType === TILE_TYPE.DOOR && isRoomOver),
        // "cursor-default": tileType === TILE_TYPE.DOOR && !isRoomOver,

        // Only put border black on wall tiles
        "hover:border-black":
          tileType == TILE_TYPE.EMPTY ||
          (tileType == TILE_TYPE.DOOR && isRoomOver),

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
        [effectBorderClasses]:
          isEffectZone &&
          (isAttackEffectTile || isMovingEffectTile || isSkillEffectTile),
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
  );
};
