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
        return "Player Turn";
      case ENTITY_TYPE.ENEMY:
        return "Enemy Turn";
      default:
        return "...";
    }
  }, [turnCycle]);

  return (
    <div>
      <div
        className={clsx({
          "text-green-500": turnCycle[0][0] === ENTITY_TYPE.PLAYER,
          "text-red-500": turnCycle[0][0] === ENTITY_TYPE.ENEMY,
        })}
      >
        {currentTurn}
      </div>
    </div>
  );
};
