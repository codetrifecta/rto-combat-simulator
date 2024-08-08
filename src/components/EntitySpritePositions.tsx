import { FC } from 'react';
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

  const { roomEntityPositions } = useGameStateStore();

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
                : TILE_SIZE * 1.7,
          }}
        >
          {/* Animated Sprite */}
          <div
            className="overflow-hidden"
            style={{
              width: player.sprite_size,
              height: player.sprite_size,
            }}
          >
            <div
              className="animate-entityIdle20"
              style={{
                width: player.sprite_size * 6,
                height: player.sprite_size * 12,
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
                : TILE_SIZE * 1.5,
            height:
              enemy.sprite_size < TILE_SIZE
                ? enemy.sprite_size
                : TILE_SIZE * 1.7,
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
              className="animate-entityIdle08"
              style={{
                width: spriteSheetWidth,
                height: spriteSheetHeight,
                left: -10,
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
      {Array.from(roomEntityPositions).map(
        ([positionString, [entityType, entityID]]) => {
          console.log(positionString, entityType, entityID);

          const [row, col] = positionString.split(',').map(Number);

          if (entityType === ENTITY_TYPE.PLAYER) {
            const player = getPlayer();
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
            const { enemies } = useEnemyStore();
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
        }
      )}
    </div>
  );
};

const EntitySpritePositionContainer: FC<{
  key: string;
  id: string;
  classNames?: string;
  row: number;
  col: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: JSX.Element;
}> = ({
  key,
  id,
  classNames,
  row,
  col,
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      key={key}
      id={id}
      className={clsx('absolute', classNames)}
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
