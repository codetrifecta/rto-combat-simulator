import { FC, useMemo } from 'react';
import { useGameStateStore } from '../store/game';
import { ENTITY_TYPE } from '../constants/entity';
import { IEntity } from '../types';
import { useEnemyStore } from '../store/enemy';
import { usePlayerStore } from '../store/player';

export const EntityTurnText: FC = () => {
  const { turnCycle } = useGameStateStore();
  const { enemies } = useEnemyStore();

  const { getPlayer } = usePlayerStore();
  const player = getPlayer();

  // Map turn cycle to entities (player and enemies)
  // This is to ensure that the correct entity is displayed in the turn cycle as the player and enemies are updated
  const turnEntities = useMemo(() => {
    return turnCycle.map((entity) => {
      if (entity.entityType === ENTITY_TYPE.PLAYER) {
        return player;
      } else {
        const enemy = enemies.find((enemy) => enemy.id === entity.id);
        if (enemy) {
          return enemy;
        }
        return null;
      }
    });
  }, [enemies, player, turnCycle]);

  const renderEntityTurnText = (entity: IEntity | null) => {
    if (!entity) {
      return '';
    }

    if (entity.entityType === ENTITY_TYPE.PLAYER) {
      return (
        <>
          <span className="text-green-500">{entity.name + "'s"}</span> turn
        </>
      );
    } else if (entity.entityType === ENTITY_TYPE.ENEMY) {
      return (
        <>
          <span className="text-red-500">{entity.name + "'s"}</span> turn
        </>
      );
    }

    return (
      <>
        <span>{entity.name + "'s"}</span> turn
      </>
    );
  };
  return (
    <div className="flex justify-center items-center bg-neutral-900 px-5 py-1 border border-gray-800">
      <h2>{renderEntityTurnText(turnEntities[0])}</h2>
    </div>
  );
};
