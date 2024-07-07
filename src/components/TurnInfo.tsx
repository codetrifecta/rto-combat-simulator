import { FC, useMemo } from "react";
import { IEntity } from "../types";
import { ENTITY_TYPE } from "../constants";
import clsx from "clsx";
import { useGameStateStore } from "../store/game";
import { usePlayerStore } from "../store/player";
import { useEnemyStore } from "../store/enemy";
import { StatusEffect } from "./StatusEffect";

export const TurnInfo: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  const { turnCycle } = useGameStateStore();

  const { getPlayer } = usePlayerStore();
  const player = getPlayer();

  const { enemies } = useEnemyStore();

  const currentTurnEntity = useMemo(() => {
    const first = turnCycle[0];

    if (first.entityType === ENTITY_TYPE.PLAYER) {
      return player;
    } else {
      const enemy = enemies.find((enemy) => enemy.id === first.id);
      if (enemy) {
        return enemy;
      }
      return null;
    }
  }, [enemies, player, turnCycle]);

  const nextTurnEnties = useMemo(() => {
    return turnCycle.slice(1).map((entity) => {
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
      return "";
    }

    if (entity.entityType === ENTITY_TYPE.PLAYER) {
      return (
        <>
          <span className="text-green-500">{entity.name}'s</span> turn
        </>
      );
    } else if (entity.entityType === ENTITY_TYPE.ENEMY) {
      return (
        <>
          <span className="text-red-500">{entity.name}'s</span> turn
        </>
      );
    }

    return (
      <>
        <span>{entity.name}'s</span> turn
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[130px] mx-auto flex justify-center">
        <div
          className="mr-5"
          onMouseEnter={() => setCurrentHoveredEntity(currentTurnEntity)}
          onMouseLeave={() => setCurrentHoveredEntity(null)}
        >
          <EntityCard entity={currentTurnEntity} active={true} />
        </div>
        {nextTurnEnties.length >= 1 &&
          nextTurnEnties.map((entity) => {
            if (!entity) {
              return null;
            }

            return (
              <div
                key={entity.entityType + entity.id}
                className="mr-1"
                onMouseEnter={() => setCurrentHoveredEntity(entity)}
                onMouseLeave={() => setCurrentHoveredEntity(null)}
              >
                <EntityCard
                  entity={entity}
                  active={
                    currentHoveredEntity?.entityType === entity.entityType &&
                    currentHoveredEntity?.id === entity.id
                  }
                />
              </div>
            );
          })}
      </div>
      <h2>{renderEntityTurnText(currentTurnEntity)}</h2>
    </div>
  );
};
const EntityCard: FC<{ entity: IEntity | null; active: boolean }> = ({
  entity,
  active,
}) => {
  if (!entity) {
    return null;
  }

  return (
    <div>
      <div
        className={clsx("relative border p-3 cursor-default", {
          "bg-green-700": entity.entityType === ENTITY_TYPE.PLAYER,
          "bg-red-700": entity.entityType === ENTITY_TYPE.ENEMY,
          "z-0 hover:shadow-intense-green hover:z-10":
            entity.entityType === ENTITY_TYPE.PLAYER && !active,
          "z-0 hover:shadow-intense-red hover:z-10":
            entity.entityType === ENTITY_TYPE.ENEMY && !active,
          "shadow-intense-green z-10":
            entity.entityType === ENTITY_TYPE.PLAYER && active,
          "shadow-intense-red z-10":
            entity.entityType === ENTITY_TYPE.ENEMY && active,
        })}
      >
        <h3>{entity.name}</h3>
        <h4>
          HP: {entity.health} / {entity.maxHealth}
        </h4>
      </div>
      {/* Display statuses if present */}
      <div className="mt-3 flex flex-wrap justify-center items-center">
        {entity.statuses.length > 0 &&
          entity.statuses.map((status) => (
            <StatusEffect key={status.id} status={status} />
          ))}
      </div>
    </div>
  );
};
