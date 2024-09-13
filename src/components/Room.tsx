import { FC } from 'react';
import { TILE_SIZE } from '../constants/tile';
import { useGameStateStore } from '../store/game';
import { EntitySpritePositions } from './EntitySpritePositions';
import { RoomDoorArt } from './RoomDoorArt';
import { RoomFloorArt } from './RoomFloorArt';
import { RoomObstacleArt } from './RoomObstacleArt';
import { RoomWallArt } from './RoomWallArt';
import { SkillAnimation } from './SkillAnimation';
import { IEntity } from '../types';
import { RoomLogic } from './RoomLogic';

export const Room: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  const { roomLength } = useGameStateStore();

  return (
    <div
      className="relative"
      style={{
        width: roomLength * TILE_SIZE,
        height: roomLength * TILE_SIZE,
      }}
    >
      <div id="entity_sprite_positions" className="absolute top-0 left-0 z-20 ">
        <EntitySpritePositions
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
        <RoomObstacleArt
          width={roomLength * TILE_SIZE}
          height={roomLength * TILE_SIZE}
        />
        <SkillAnimation />
      </div>
      <div className="absolute z-10">
        <RoomLogic
          currentHoveredEntity={currentHoveredEntity}
          setCurrentHoveredEntity={setCurrentHoveredEntity}
        />
      </div>
      <div className="absolute z-[6]">
        <RoomDoorArt
          width={roomLength * TILE_SIZE}
          height={roomLength * TILE_SIZE}
        />
      </div>
      <div className="absolute z-[5]">
        <RoomWallArt
          width={roomLength * TILE_SIZE}
          height={roomLength * TILE_SIZE}
        />
      </div>
      <div className="absolute z-0">
        <RoomFloorArt
          width={roomLength * TILE_SIZE}
          height={roomLength * TILE_SIZE}
        />
      </div>
    </div>
  );
};
