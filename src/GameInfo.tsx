import { FC, useMemo } from "react";
import { GameState } from "./types";
import { ENTITY_TYPE } from "./constants";
import clsx from "clsx";

export const GameInfo: FC<{ gameState: GameState }> = ({
  gameState: { turnCycle },
}) => {
  const currentTurn = useMemo(() => {
    switch (turnCycle[0][0]) {
      case ENTITY_TYPE.PLAYER:
        return "Player";
      case ENTITY_TYPE.ENEMY:
        return "Enemy";
      default:
        return "...";
    }
  }, [turnCycle]);

  const nextTurns: string[] = useMemo(() => {
    return turnCycle.slice(1).map(([entityType]) => {
      switch (entityType) {
        case ENTITY_TYPE.PLAYER:
          return "Player";
        case ENTITY_TYPE.ENEMY:
          return "Enemy";
        default:
          return "...";
      }
    });
  }, [turnCycle]);

  return (
    <div>
      <h2
        className={clsx({
          "text-green-500": turnCycle[0][0] === ENTITY_TYPE.PLAYER,
          "text-red-500": turnCycle[0][0] === ENTITY_TYPE.ENEMY,
        })}
      >
        Current turn: {currentTurn}
      </h2>
      <h2>Next turn(s): {nextTurns.length > 0 && nextTurns.join(" -> ")}</h2>
    </div>
  );
};
