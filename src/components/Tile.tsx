import { FC, useMemo } from 'react';
import { ENTITY_TYPE } from '../constants/entity';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import clsx from 'clsx';
import { IPlayerState } from '../types';
import { useEnemyStore } from '../store/enemy';
import { Sprite } from './Sprite';
import { SPRITE_ID } from '../constants/sprite';

export const Tile: FC<{
  tileID: number;
  sprite: SPRITE_ID;
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
  tileID,
  tileType,
  sprite,
  entityIfExist,
  playerState,
  active,
  isEffectZone,
  isTargetZone = false,
  isRoomOver,
  onClick,
  onMouseEnter,
  onMouseLeave,
  classNames = '',
}) => {
  const { enemies } = useEnemyStore();

  const hasPlayer = useMemo(() => {
    if (entityIfExist) {
      return entityIfExist[0] === ENTITY_TYPE.PLAYER;
    }
  }, [entityIfExist]);

  const hasEnemy = useMemo(() => {
    if (entityIfExist) {
      return entityIfExist[0] === ENTITY_TYPE.ENEMY;
    }
  }, [entityIfExist]);

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
        return 'hover:opacity-80 shadow-mild-red z-10';
      } else if (playerState.isMoving && isMovingEffectTile) {
        return 'hover:opacity-80 shadow-mild-blue z-10';
      } else if (playerState.isUsingSkill && isSkillEffectTile) {
        if (hasPlayer) {
          // Make sure self target skills highlight yellow on player tile
          return 'hover:opacity-80 !shadow-mild-yellow z-10';
        }
        return 'hover:opacity-80 shadow-mild-yellow z-10';
      }
    }
    return '';
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
    if (!entityIfExist) return null;

    if (hasPlayer) {
      return (
        <div
          id="player_1"
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="bg-green-500 w-[16px] h-[16px]"></div>
        </div>
      );
    }

    if (hasEnemy) {
      const enemy = enemies.find((enemy) => enemy.id === entityIfExist[1]);

      if (!enemy) return null;

      return (
        <div className="absolute z-50 bottom-[35%] left-0 w-full h-full flex justify-center items-end">
          <Sprite
            id={`${enemy.entityType}_${enemy.id}`}
            sprite={enemy.sprite}
            width={enemy.sprite_size}
            height={enemy.sprite_size}
          />
        </div>
      );
    }
  };

  return (
    <div
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
      className={clsx('relative ', classNames, {
        // Only use cursor-pointer non-wall tiles (and door tiles if room is over)
        'cursor-pointer hover:z-30':
          (tileType !== TILE_TYPE.WALL &&
            tileType !== TILE_TYPE.DOOR &&
            tileType !== TILE_TYPE.NULL) ||
          (tileType === TILE_TYPE.DOOR && isRoomOver),
        // "cursor-default": tileType === TILE_TYPE.DOOR && !isRoomOver,

        // Only put shadow black on non-wall tiles
        'hover:shadow-mild-black':
          (tileType == TILE_TYPE.FLOOR && !(hasPlayer || hasEnemy)) ||
          (tileType == TILE_TYPE.DOOR && isRoomOver),

        // Tile type color
        'bg-white': tileType === TILE_TYPE.FLOOR,
        'bg-yellow-500': tileType === TILE_TYPE.DOOR,

        // Player and enemy tile
        'hover:shadow-intense-green': hasPlayer,
        'hover:shadow-intense-red': hasEnemy,

        // Active tile
        'shadow-mild-green z-20': hasPlayer && active,
        'shadow-mild-red z-20': hasEnemy && active,

        // Non-active tile
        'z-0': !active,

        // Effect zone
        [effectBorderClasses]:
          isEffectZone &&
          (isAttackEffectTile || isMovingEffectTile || isSkillEffectTile),

        // Target zone
        'opacity-80': isTargetZone && isSkillEffectTile,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Sprite
        id={`tile_${tileID}`}
        sprite={sprite}
        backgroundSprite={
          // Bottom, left, right wall IDs
          [2, 66, 67].includes(tileID)
            ? SPRITE_ID.CELLAR_FLOOR_001
            : // Door IDs - Door background sprite is the same as wall sprite
              // Top door IDs
              [365, 366, 367].includes(tileID)
              ? SPRITE_ID.CELLAR_WALL_005
              : // Bottom door IDs
                [396, 398].includes(tileID)
                ? SPRITE_ID.CELLAR_WALL_035
                : undefined
        }
        width={TILE_SIZE}
        height={TILE_SIZE}
      />
      {renderEntity()}
    </div>
  );
};
