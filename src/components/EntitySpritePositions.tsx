import { FC, useMemo } from 'react';
import { usePlayerStore } from '../store/player';
import { useGameStateStore } from '../store/game';
import { Sprite } from './Sprite';
import { TILE_SIZE } from '../constants/tile';
import { IEnemy, IEntity, IPlayer } from '../types';
import { ENTITY_TYPE } from '../constants/entity';
import { useEnemyStore } from '../store/enemy';
import clsx from 'clsx';

export const EntitySpritePositions: FC<{
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ setCurrentHoveredEntity }) => {
  const { getPlayer } = usePlayerStore();
  const { enemies } = useEnemyStore();

  const player = getPlayer();
  const { roomEntityPositions } = useGameStateStore();

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

  const renderPlayer = (player: IPlayer) => {
    return (
      <div className="absolute z-[35] bottom-0 left-0 w-full flex justify-center items-end cursor-pointer">
        {/* Cap off extra width and height */}
        <div
          id={`${player.entityType}_${player.id}`}
          className="absolute flex justify-center items-center overflow-hidden"
          style={{
            width:
              player.sprite_size < TILE_SIZE
                ? player.sprite_size
                : TILE_SIZE * 1.5,
            height:
              player.sprite_size < TILE_SIZE
                ? player.sprite_size
                : TILE_SIZE * 1.5,
          }}
        >
          <div
            className="absolute bottom-[10px] overflow-hidden"
            style={{
              width: player.sprite_size,
              height: player.sprite_size,
            }}
          >
            <div
              id={`spritesheet_container_${player.entityType}_${player.id}`}
              className="animate-entityAnimate20"
              style={{
                position: 'absolute',
                width: player.sprite_size * 6,
                height: player.sprite_size * 12,
                top: 0,
                left: 0,
              }}
            >
              <Sprite
                id={`sprite_${player.entityType}_${player.id}`}
                sprite={player.sprite}
                width={player.sprite_size * 6}
                height={player.sprite_size * 12}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEnemy = (enemy: IEnemy) => {
    const spriteSheetWidth = enemy.sprite_size * 6;
    let spriteSheetHeight = enemy.sprite_size * 5;

    if (enemy.name === 'Minotaur') {
      spriteSheetHeight = enemy.sprite_size * 7;
    }

    return (
      <div className="absolute z-[35] bottom-0 left-0 w-full flex justify-center items-end cursor-pointer">
        {/* Cap off extra width and height */}
        <div
          id={`${enemy.entityType}_${enemy.id}`}
          className="absolute flex justify-center items-center overflow-hidden"
          style={{
            width:
              enemy.sprite_size < TILE_SIZE
                ? enemy.sprite_size
                : TILE_SIZE * 1.8,
            height:
              enemy.sprite_size < TILE_SIZE
                ? enemy.sprite_size
                : TILE_SIZE * 1.8,
          }}
        >
          <div
            className="absolute bottom-[10px] overflow-hidden"
            style={{
              width: enemy.sprite_size,
              height: enemy.sprite_size,
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
                // left: -10,
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
    <div>
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
              onMouseEnter={() => setCurrentHoveredEntity(enemy)}
              onMouseLeave={() => setCurrentHoveredEntity(null)}
            >
              {renderEnemy(enemy)}
            </EntitySpritePositionContainer>
          );
        }
      })}
    </div>
  );
};

const EntitySpritePositionContainer: FC<{
  id: string;
  classNames?: string;
  row: number;
  col: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: JSX.Element;
}> = ({ id, classNames, row, col, children, onMouseEnter, onMouseLeave }) => {
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
      }}
      onMouseEnter={() => onMouseEnter && onMouseEnter()}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      {children}
    </div>
  );
};
