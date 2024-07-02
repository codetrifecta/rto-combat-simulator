import { FC, useMemo } from "react";
import { IGameState } from "./types";
import { ENTITY_TYPE } from "./constants";
import clsx from "clsx";

export const GameInfo: FC<{ gameState: IGameState }> = ({
  gameState: { turnCycle },
}) => {
  const currentTurn = useMemo(() => {
    const currentEntity = turnCycle[0];

    return currentEntity.name;
  }, [turnCycle]);

  const nextTurns: string[] = useMemo(() => {
    return turnCycle.slice(1).map((entity) => {
      return entity.name;
    });
  }, [turnCycle]);

  return (
    <div>
      <h2
        className={clsx({
          "text-green-500": turnCycle[0].entityType === ENTITY_TYPE.PLAYER,
          "text-red-500": turnCycle[0].entityType === ENTITY_TYPE.ENEMY,
        })}
      >
        Current turn: {currentTurn}
      </h2>
      <h2>Next turn(s): {nextTurns.length > 0 && nextTurns.join(" -> ")}</h2>
    </div>
  );
};
