import { FC } from "react";
import { IEntity, IGameState } from "./types";
import { ENTITY_TYPE } from "./constants";
import clsx from "clsx";

export const GameInfo: FC<{
  gameState: IGameState;
  currentHoveredEntity: IEntity | null;
}> = ({ gameState: { turnCycle }, currentHoveredEntity }) => {
  console.log("currently hovered entity:", currentHoveredEntity);

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="mr-5">
        <EntityCard
          entity={turnCycle[0]}
          active={
            currentHoveredEntity?.entityType === turnCycle[0].entityType &&
            currentHoveredEntity?.id === turnCycle[0].id
          }
        />
      </div>
      {turnCycle.length > 1 &&
        turnCycle.slice(1).map((entity) => {
          return (
            <div key={entity.id} className="mr-1">
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

  // return (
  //   <div>
  //     <h2
  //       className={clsx({
  //         "text-green-500": turnCycle[0].entityType === ENTITY_TYPE.PLAYER,
  //         "text-red-500": turnCycle[0].entityType === ENTITY_TYPE.Entity,
  //       })}
  //     >
  //       Current turn: {currentTurnEntityName}
  //     </h2>
  //     <h2>Next turn(s): {nextTurns.length > 0 && nextTurns.join(" -> ")}</h2>
  //   </div>
  // );
};

const EntityCard: FC<{ entity: IEntity; active: boolean }> = ({
  entity,
  active,
}) => {
  return (
    <div
      className={clsx("border p-3", {
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
