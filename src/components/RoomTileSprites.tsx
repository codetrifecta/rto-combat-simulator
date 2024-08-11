import { FC } from 'react';
import { DOORS, FLOORS, TILE_SIZE, TILE_TYPE, WALLS } from '../constants/tile';
import { useGameStateStore } from '../store/game';
import { Sprite } from './Sprite';
import { SPRITE_ID } from '../constants/sprite';

export const RoomTileSprites: FC = () => {
  const { isRoomOver, roomTileMatrix, roomLength } = useGameStateStore();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
      }}
    >
      {roomTileMatrix.map((row, rowIndex) => {
        return row.map(([tileType, tileID], columnIndex) => {
          let sprite: SPRITE_ID | null | undefined = null;

          switch (tileType) {
            case TILE_TYPE.FLOOR:
              sprite = FLOORS.find((floor) => floor.id === tileID)?.sprite;
              break;
            case TILE_TYPE.WALL:
              sprite = WALLS.find((wall) => wall.id === tileID)?.sprite;
              break;
            case TILE_TYPE.DOOR:
              sprite = DOORS.find((door) => door.id === tileID)?.sprite;
              break;
            case TILE_TYPE.NULL:
              sprite = null;
              break;
            default:
              break;
          }

          // Render closed door sprite when room is not over
          if ([397, 366].includes(tileID) && !isRoomOver) {
            switch (tileID) {
              case 397: // Get closed door
                sprite = DOORS.find((door) => door.id === 282)?.sprite;
                break;
              case 366:
                sprite = WALLS.find((door) => door.id === 253)?.sprite;
                break;
              default:
                break;
            }
          }

          if (sprite === undefined) {
            console.error('Sprite not found!', sprite, tileType, tileID);
            return null;
          }

          if (sprite === null) {
            return null;
          }

          return (
            <Sprite
              key={`tile_sprite_${rowIndex}_${columnIndex}`}
              id={`tile_sprite_${tileID}`}
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
          );
        });
      })}
    </div>
  );
};
