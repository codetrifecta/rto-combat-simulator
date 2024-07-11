import { FC, useMemo } from "react";
import { ENTITY_TYPE, TILE_SIZE, TILE_TYPE } from "../constants";
import clsx from "clsx";
import { IPlayerState } from "../types";

export const Tile: FC<{
  tileType: number;
  entityIfExist?: [ENTITY_TYPE, number] | undefined;
  playerState: IPlayerState;
  active: boolean;
  isEffectZone: boolean;
  isTargetZone: boolean | null;
  isRoomOver: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  classNames?: string;
}> = ({
  tileType,
  entityIfExist,
  playerState,
  active,
  isEffectZone,
  isTargetZone = false,
  isRoomOver,
  onClick,
  onMouseEnter,
  onMouseLeave,
  classNames = "",
}) => {
  const hasPlayer = useMemo(() => {
    if (entityIfExist) {
      console.log("player", entityIfExist, active);
      return entityIfExist[0] === ENTITY_TYPE.PLAYER;
    }
  }, [active, entityIfExist]);

  const hasEnemy = useMemo(() => {
    if (entityIfExist) {
      console.log("enemy", entityIfExist, active);
      return entityIfExist[0] === ENTITY_TYPE.ENEMY;
    }
  }, [active, entityIfExist]);

  const isAttackEffectTile = useMemo(() => {
    return (
      tileType !== TILE_TYPE.WALL && tileType !== TILE_TYPE.DOOR && !hasPlayer
    );
  }, [hasPlayer, tileType]);

  const isMovingEffectTile = useMemo(() => {
    if (isRoomOver) {
      // Player can move to the door when the room is over (door restriction is lifted)
      return tileType !== TILE_TYPE.WALL && !hasPlayer && !hasEnemy;
    } else {
      return (
        tileType !== TILE_TYPE.WALL &&
        tileType !== TILE_TYPE.DOOR &&
        !hasPlayer &&
        !hasEnemy
      );
    }
  }, [hasEnemy, hasPlayer, isRoomOver, tileType]);

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

  const renderEntity = () => {
    if (hasPlayer) {
      return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-green-500 w-1/2 h-1/2"></div>
        </div>
      );
    }

    if (hasEnemy) {
      return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-red-500 w-1/2 h-1/2"></div>
        </div>
      );
    }
  };

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

        "bg-green-500 z-10 hover:shadow-intense-green": hasPlayer,
        "bg-red-500 z-10 hover:shadow-intense-red": hasEnemy,

        // Active tile
        "shadow-intense-green z-10": hasPlayer && active,
        "shadow-intense-red z-10": hasEnemy && active,

        // Effect zone
        [effectBorderClasses]:
          isEffectZone &&
          (isAttackEffectTile || isMovingEffectTile || isSkillEffectTile),

        // Target zone
        "opacity-80": isTargetZone && isSkillEffectTile,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {renderEntity()}
    </div>
  );
};
