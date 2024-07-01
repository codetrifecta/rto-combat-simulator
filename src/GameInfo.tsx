import { FC } from "react";
import { GameState } from "./types";
import { ENTITY_TYPE } from "./constants";
import clsx from "clsx";

export const GameInfo: FC<{ gameState: GameState }> = ({
  gameState: { turnCycle },
}) => {
  return (
    <div>
      <div
        className={clsx({
          "text-green-500": turnCycle[0][0] === ENTITY_TYPE.PLAYER,
          "text-red-500": turnCycle[0][0] === ENTITY_TYPE.ENEMY,
        })}
      >
        {turnCycle[0][0] === ENTITY_TYPE.PLAYER ? "Player Turn" : "Enemy Turn"}
      </div>
    </div>
  );
};
