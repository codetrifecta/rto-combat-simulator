import { FC, useMemo } from 'react';
import { usePlayerStore } from '../store/player';
import { useGameStateStore } from '../store/game';
import { Sprite } from './Sprite';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import { IEnemy, IEntity, IPlayer } from '../types';
import { ENTITY_TYPE } from '../constants/entity';
import { useEnemyStore } from '../store/enemy';
import clsx from 'clsx';
import { STATUS_ID } from '../constants/status';
import { Icon } from './Icon';
import { ICON_ID } from '../constants/icon';

const PLAYER_STATE_INDICATOR_SIZE = 35;

export const EntitySpritePositions: FC<{
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ setCurrentHoveredEntity }) => {
  const { getPlayer } = usePlayerStore();
  const { enemies } = useEnemyStore();

  const player = getPlayer();
  const { roomEntityPositions, roomTileMatrix } = useGameStateStore();

  const roomEntityPositionsFlipped: [
    [ENTITY_TYPE, number],
    [number, number],
  ][] = useMemo(() => {
    // Flipping the map and storing it in a sorted list where player is first and enemies are next in order of their id
    const flipped: [[ENTITY_TYPE, number], [number, number]][] = new Array(
      roomEntityPositions.size
    );

    Array.from(roomEntityPositions).forEach(
      ([positionString, [entityType, entityID]]) => {
        const [row, col] = positionString.split(',').map(Number);

        // Take advantage of the fact that entity IDs are unique and start from 1 for each type
        // Subtracting 1 from player ID to get the correct index
        // Since only 1 player can exist currently, we can index enemies directly by their ID
        if (entityType === ENTITY_TYPE.PLAYER) {
          flipped[entityID - 1] = [
            [entityType, entityID],
            [row, col],
          ];
        } else if (entityType === ENTITY_TYPE.ENEMY) {
          flipped[entityID] = [
            [entityType, entityID],
            [row, col],
          ];
        }
      }
    );

    return flipped;
  }, [roomEntityPositions]);

  const renderPlayerStateIndicator = (player: IPlayer) => {
    if (player.state.isAttacking) {
      // Ensure player has a weapon equipped
      if (!player.equipment.weapon) {
        console.error(
          'renderPlayerStateIndicator: Player has no weapon equipped'
        );
        return null;
      }

      const weaponIcon = player.equipment.weapon.icon;

      return (
        <Icon
          width={PLAYER_STATE_INDICATOR_SIZE}
          height={PLAYER_STATE_INDICATOR_SIZE}
          icon={weaponIcon}
          className={'animate-floatUpAndDown'}
        />
      );
    } else if (player.state.isMoving) {
      return (
        <Icon
          width={PLAYER_STATE_INDICATOR_SIZE}
          height={PLAYER_STATE_INDICATOR_SIZE}
          icon={ICON_ID.MOVE}
          className={'animate-floatUpAndDown'}
        />
      );
    } else if (player.state.isUsingSkill) {
      // Ensure player has a skill selected
      if (!player.state.skillId) {
        console.error(
          'renderPlayerStateIndicator: Player has no skill selected'
        );
        return null;
      }

      const skill = player.skills.find(
        (skill) => skill.id === player.state.skillId
      );

      // Ensure skill is found
      if (!skill) {
        console.error('renderPlayerStateIndicator: Player skill not found');
        return null;
      }

      const skillIcon = skill.icon;

      return (
        <Icon
          width={PLAYER_STATE_INDICATOR_SIZE}
          height={PLAYER_STATE_INDICATOR_SIZE}
          icon={skillIcon}
          className={'animate-floatUpAndDown'}
        />
      );
    }

    return null;
  };

  const renderPlayerStateIndicatorContainer = useMemo(() => {
    // Get the player's current position

    const roomEntity = roomEntityPositionsFlipped.find(
      ([entityType]) => entityType[0] === ENTITY_TYPE.PLAYER
    );

    if (!roomEntity) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, [row, col]] = roomEntity;

    return (
      <div
        id={`player_state_indicator`}
        className="absolute pointer-events-none"
        style={{
          top: row * TILE_SIZE - TILE_SIZE * 0.8,
          left: col * TILE_SIZE + TILE_SIZE / 2,
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
        }}
      >
        {renderPlayerStateIndicator(player)}
      </div>
    );
  }, [roomEntityPositionsFlipped, player]);

  const renderPlayer = (player: IPlayer) => {
    const isHidden = player.statuses.some(
      (status) => status.id === STATUS_ID.HIDDEN
    );

    return (
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end cursor-pointer">
        <div
          className="absolute left-[50%]"
          style={{
            bottom: player.spriteSize + 5,
            transform: 'translateX(-50%)',
          }}
        ></div>
        {/* Cap off extra width and height */}
        <div
          id={`${player.entityType}_${player.id}`}
          className="absolute flex justify-center items-center overflow-hidden"
          style={{
            width:
              player.spriteSize < TILE_SIZE
                ? player.spriteSize
                : TILE_SIZE * 1.5,
            height:
              player.spriteSize < TILE_SIZE
                ? player.spriteSize
                : TILE_SIZE * 1.5,
          }}
        >
          <div
            className="absolute bottom-[10px] overflow-hidden"
            style={{
              width: player.spriteSize,
              height: player.spriteSize,
            }}
          >
            <div
              id={`spritesheet_container_${player.entityType}_${player.id}`}
              className="animate-entityAnimate20"
              style={{
                position: 'absolute',
                width: player.spriteSize * player.spritesheetColumns,
                height: player.spriteSize * player.spritesheetRows,
                top: 0,
                left: 0,
                opacity: isHidden ? 0.3 : 1,
              }}
            >
              <Sprite
                id={`sprite_${player.entityType}_${player.id}`}
                sprite={player.sprite}
                width={player.spriteSize * player.spritesheetColumns}
                height={player.spriteSize * player.spritesheetRows}
                grayscale={isHidden}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEnemy = (enemy: IEnemy) => {
    const spriteSheetWidth = enemy.spriteSize * enemy.spritesheetColumns;
    const spriteSheetHeight = enemy.spriteSize * enemy.spritesheetRows;

    return (
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end cursor-pointer">
        {/* Cap off extra width and height */}
        <div
          id={`${enemy.entityType}_${enemy.id}`}
          className="absolute flex justify-center items-center overflow-hidden"
          style={{
            width:
              enemy.spriteSize < TILE_SIZE ? enemy.spriteSize : TILE_SIZE * 3,
            height:
              enemy.spriteSize < TILE_SIZE ? enemy.spriteSize : TILE_SIZE * 4,
          }}
        >
          <div
            className="absolute bottom-[10px] overflow-hidden"
            style={{
              width: enemy.spriteSize,
              height: enemy.spriteSize,
            }}
          >
            <div
              id={`spritesheet_container_${enemy.entityType}_${enemy.id}`}
              className="animate-entityAnimate08"
              style={{
                position: 'absolute',
                width: spriteSheetWidth,
                height: spriteSheetHeight,
                top: 0,
                left: 0,
              }}
            >
              <Sprite
                id={`sprite_${enemy.entityType}_${enemy.id}`}
                sprite={enemy.sprite}
                width={spriteSheetWidth}
                height={spriteSheetHeight}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderPlayerStateIndicatorContainer}
      {roomEntityPositionsFlipped.map((entityPosition) => {
        // console.log(positionString, entityType, entityID);

        const [[entityType, entityID], [row, col]] = entityPosition;

        if (entityType === ENTITY_TYPE.PLAYER) {
          return (
            <EntitySpritePositionContainer
              key={`sprite_player_${player.id}`}
              id={`sprite_player_${player.id}`}
              row={row}
              col={col}
              entity={player}
              roomTileMatrix={roomTileMatrix}
              onMouseEnter={() => setCurrentHoveredEntity(player)}
              onMouseLeave={() => setCurrentHoveredEntity(null)}
            >
              {renderPlayer(player)}
            </EntitySpritePositionContainer>
          );
        } else if (entityType === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((enemy) => enemy.id === entityID);

          if (!enemy) {
            return null;
          }

          return (
            <EntitySpritePositionContainer
              key={`sprite_enemy_${enemy.id}`}
              id={`sprite_enemy_${enemy.id}`}
              row={row}
              col={col}
              entity={enemy}
              roomTileMatrix={roomTileMatrix}
              onMouseEnter={() => setCurrentHoveredEntity(enemy)}
              onMouseLeave={() => setCurrentHoveredEntity(null)}
            >
              {renderEnemy(enemy)}
            </EntitySpritePositionContainer>
          );
        }
      })}
    </>
  );
};

const EntitySpritePositionContainer: FC<{
  id: string;
  classNames?: string;
  row: number;
  col: number;
  entity: IEntity;
  roomTileMatrix?: number[][];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: JSX.Element;
}> = ({
  id,
  classNames,
  row,
  col,
  // entity,
  roomTileMatrix,
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Check if the 3x1 tile right above the entity is a wall or door
  // If it is, set the z-index to 35 to ensure the entity is rendered above the wall
  const isTileAboveEntityAnObstacle =
    roomTileMatrix &&
    (roomTileMatrix[row - 1][col] === TILE_TYPE.OBSTACLE ||
      roomTileMatrix[row - 1][col] === TILE_TYPE.DOOR ||
      roomTileMatrix[row - 1][col + 1] === TILE_TYPE.OBSTACLE ||
      roomTileMatrix[row - 1][col - 1] === TILE_TYPE.OBSTACLE);

  // Check if the second tile above the entity is a wall or door if the entity is more than 1 tile tall
  // If it is, set the z-index to 35 to ensure the tall entity is rendered above the wall
  // if (entity.spriteSize / 2 > TILE_SIZE) {
  //   const isSecondTileAboveWall =
  //     roomTileMatrix &&
  //     (roomTileMatrix[row - 2][col] === TILE_TYPE.WALL ||
  //       roomTileMatrix[row - 2][col] === TILE_TYPE.DOOR);

  //   if (isSecondTileAboveWall) {
  //     isTileAboveEntityAnObstacle = true;
  //   }
  // }

  return (
    <div
      id={id}
      className={clsx(
        'absolute pointer-events-none transition-all',
        classNames
      )}
      style={{
        top: (row + 1) * TILE_SIZE,
        left: col * TILE_SIZE + TILE_SIZE / 2,
        zIndex: isTileAboveEntityAnObstacle ? 35 : 33,
        // zIndex: 100 + row,
      }}
      onMouseEnter={() => onMouseEnter && onMouseEnter()}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      {children}
    </div>
  );
};
