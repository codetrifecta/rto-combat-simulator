import { FC } from "react";
import { IEntity } from "../types";
import { ENTITY_TYPE } from "../constants";
import clsx from "clsx";
import { useGameStateStore } from "../store/game";

export const GameInfo: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  const { turnCycle } = useGameStateStore();

  return (
    <div className="w-full mx-auto flex justify-center">
      <div
        className="mr-5"
        onMouseEnter={() => setCurrentHoveredEntity(turnCycle[0])}
        onMouseLeave={() => setCurrentHoveredEntity(null)}
      >
        <EntityCard entity={turnCycle[0]} active={true} />
      </div>
      {turnCycle.length > 1 &&
        turnCycle.slice(1).map((entity) => {
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
  );
};
const EntityCard: FC<{ entity: IEntity; active: boolean }> = ({
  entity,
  active,
}) => {
  return (
    <div
      className={clsx("relative border p-3", {
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
      <h4>Health: {entity.health}</h4>
    </div>
  );
};
