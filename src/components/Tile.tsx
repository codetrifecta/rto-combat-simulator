import { FC, useMemo } from 'react';
import { ENEMY_PRESET_ID, ENTITY_TYPE } from '../constants/entity';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import clsx from 'clsx';
import { IPlayerState } from '../types';
import { useEnemyStore } from '../store/enemy';
import { Sprite } from './Sprite';
import { usePlayerStore } from '../store/player';

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
  // playerState,
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
  const { getPlayer } = usePlayerStore();
  const player = getPlayer();

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

  // const isMovingEffectTile = useMemo(() => {
  //   if (isRoomOver) {
  //     // Player can move to the door when the room is over (door restriction is lifted)
  //     return tileType !== TILE_TYPE.WALL && !hasPlayer && !hasEnemy;
  //   } else {
  //     return (
  //       tileType !== TILE_TYPE.WALL &&
  //       tileType !== TILE_TYPE.DOOR &&
  //       !hasPlayer &&
  //       !hasEnemy
  //     );
  //   }
  // }, [hasEnemy, hasPlayer, isRoomOver, tileType]);

  const isSkillEffectTile = useMemo(() => {
    return tileType !== TILE_TYPE.WALL && tileType !== TILE_TYPE.DOOR;
  }, [tileType]);

  // Effect zone classes
  // Return flat string instead of formatted because getting an error where class is not applied
  // const effectZoneClasses = useMemo(() => {
  //   let classStr = 'group-hover:opacity-80 ';

  //   if (playerState.isAttacking && isAttackEffectTile) {
  //     classStr += 'shadow-mild-red z-10 ';
  //   } else if (playerState.isMoving && isMovingEffectTile) {
  //     classStr += 'shadow-mild-blue z-10 ';
  //   } else if (playerState.isUsingSkill && isSkillEffectTile) {
  //     if (hasPlayer) {
  //       // Make sure self target skills highlight yellow on player tile
  //       // classStr += 'group-hover:opacity-80 shadow-mild-yellow z-10 ';
  //       classStr += 'group-hover:opacity-80 z-10 ';
  //     }
  //     // classStr += 'shadow-mild-yellow z-10 ';
  //     classStr += 'group-hover:opacity-80 z-10 ';
  //   }
  //   return classStr;
  // }, [
  //   isTargetZone,
  //   isEffectZone,
  //   playerState.isAttacking,
  //   playerState.isMoving,
  //   playerState.isUsingSkill,
  //   isAttackEffectTile,
  //   isMovingEffectTile,
  //   isSkillEffectTile,
  // ]);

  const targetZoneClasses = useMemo(() => {
    let classStr = '';

    if (isTargetZone) {
      // Checking for AOE skills
      if (hasPlayer) {
        classStr += '!shadow-intense-green z-[31]';
      } else if (hasEnemy) {
        // Make sure enemy target skills highlight red on enemy tile
        classStr += '!shadow-intense-red z-[31]';
      }
    }

    return classStr;
  }, [isTargetZone, hasPlayer, hasEnemy]);

  const renderEntity = () => {
    if (!entityIfExist) return null;

    if (hasPlayer) {
      return (
        <div className="absolute z-[35] bottom-[45%] left-[-15%] w-full h-full flex items-center justify-center cursor-pointer">
          {/* Animated Sprite */}
          <div
            className="overflow-hidden"
            style={{
              width: player.sprite_size,
              height: player.sprite_size,
            }}
          >
            <div
              className="animate-playerIdle"
              style={{
                width: player.sprite_size * 6,
                height: player.sprite_size * 12,
              }}
            >
              <Sprite
                id={`${player.entityType}_${player.id}`}
                sprite={player.sprite}
                width={player.sprite_size * 6}
                height={player.sprite_size * 12}
              />
            </div>
          </div>
        </div>
      );
    }

    if (hasEnemy) {
      const enemy = enemies.find((enemy) => enemy.id === entityIfExist[1]);

      if (!enemy) return null;

      const spriteSheetWidth = enemy.sprite_size * 6;
      let spriteSheetHeight = enemy.sprite_size * 5;

      if (enemy.name === 'Minotaur') {
        spriteSheetHeight = enemy.sprite_size * 7;
      }

      return (
        <div className="absolute z-[35] bottom-0 left-0 w-full h-full flex justify-center items-end cursor-pointer">
          <div
            className="absolute bottom-[10px] left-0 overflow-hidden"
            style={{
              width: enemy.sprite_size,
              height: enemy.sprite_size,
            }}
          >
            <div
              className="absolute animate-enemyIdle top-0"
              style={{
                width: spriteSheetWidth,
                height: spriteSheetHeight,
                left: -10,
              }}
            >
              <Sprite
                id={`${enemy.entityType}_${enemy.id}`}
                sprite={enemy.sprite}
                width={spriteSheetWidth}
                height={spriteSheetHeight}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
      className="relative group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
        className={clsx('absolute top-0 left-0 ', classNames, {
          // Only use cursor-pointer non-wall tiles (and door tiles if room is over)
          'cursor-pointer ':
            (tileType !== TILE_TYPE.WALL &&
              tileType !== TILE_TYPE.DOOR &&
              tileType !== TILE_TYPE.NULL) ||
            (tileType === TILE_TYPE.DOOR && isRoomOver),
          // "cursor-default": tileType === TILE_TYPE.DOOR && !isRoomOver,

          // Only put shadow black on non-wall tiles
          'group-hover:shadow-mild-black group-hover:z-30':
            (tileType == TILE_TYPE.FLOOR && !(hasPlayer || hasEnemy)) ||
            (tileType == TILE_TYPE.DOOR && isRoomOver),

          // Tile type color
          // 'bg-white': tileType === TILE_TYPE.FLOOR,
          // 'bg-yellow-500': tileType === TILE_TYPE.DOOR,

          // Player and enemy tile
          'group-hover:shadow-intense-green': hasPlayer,
          'group-hover:shadow-intense-red': hasEnemy,

          // Active tile
          'shadow-mild-green z-20': hasPlayer && active,
          'shadow-mild-red z-20': hasEnemy && active,

          // Non-active tile
          'z-0': !active,

          // Effect zone
          // [effectZoneClasses]:
          //   isEffectZone &&
          //   (isAttackEffectTile || isMovingEffectTile || isSkillEffectTile),

          // Target zone
          // 'opacity-80': isTargetZone && isSkillEffectTile,
          [targetZoneClasses]:
            isTargetZone && (isAttackEffectTile || isSkillEffectTile),
          // 'shadow-mild-green': isTargetZone && isSkillEffectTile && hasPlayer,
        })}
      ></div>
      <div
        style={{ width: TILE_SIZE, height: TILE_SIZE }}
        className={clsx('absolute top-0 left-0 ', {
          // Effect zone
          'bg-black group-hover:opacity-50 opacity-30':
            isEffectZone && isSkillEffectTile && !isTargetZone,

          // Target zone
          'bg-black opacity-50': isTargetZone && isSkillEffectTile,
        })}
      ></div>
      {renderEntity()}
    </div>
  );
};
