import { FC, useMemo } from "react";
import { IEntity } from "../types";
import { ENTITY_TYPE } from "../constants/entity";
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
      <div className="w-full h-[135px] mx-auto flex justify-center">
        {turnEntities.map((entity) => {
          if (!entity) {
            return null;
          }

          return (
            <div key={entity.entityType + entity.id} className="mr-1">
              <EntityCard
                entity={entity}
                active={
                  currentHoveredEntity?.entityType === entity.entityType &&
                  currentHoveredEntity?.id === entity.id
                }
                onMouseEnter={() => setCurrentHoveredEntity(entity)}
                onMouseLeave={() => setCurrentHoveredEntity(null)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center bg-neutral-900 px-5 py-1 border border-white">
        <h2>{renderEntityTurnText(turnEntities[0])}</h2>
      </div>
    </div>
  );
};
const EntityCard: FC<{
  entity: IEntity | null;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ entity, active, onMouseEnter, onMouseLeave }) => {
  if (!entity) {
    return null;
  }

  return (
    <div>
      <div
        className={clsx("relative border p-3 cursor-default", {
          "z-0 hover:shadow-intense-green hover:z-10":
            entity.entityType === ENTITY_TYPE.PLAYER && !active,
          "z-0 hover:shadow-intense-red hover:z-10":
            entity.entityType === ENTITY_TYPE.ENEMY && !active,
          "shadow-intense-green z-10":
            entity.entityType === ENTITY_TYPE.PLAYER && active,
          "shadow-intense-red z-10":
            entity.entityType === ENTITY_TYPE.ENEMY && active,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={clsx(
            "absolute z-[-10] bottom-0 left-0 w-full transition-all ease-in-out duration-300 delay-0",
            {
              "bg-green-700": entity.entityType === ENTITY_TYPE.PLAYER,
              "bg-red-700": entity.entityType === ENTITY_TYPE.ENEMY,
            }
          )}
          style={{ height: (entity.health / entity.maxHealth) * 100 + "%" }}
        ></div>
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
