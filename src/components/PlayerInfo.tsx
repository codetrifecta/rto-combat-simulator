import { FC } from "react";
import { ActionPoints } from "./ActionPoints";
import { useGameStateStore } from "../store/game";
import clsx from "clsx";
import { StatusEffect } from "./StatusEffect";
import { usePlayerStore } from "../store/player";

export const PlayerInfo: FC = () => {
  const { getPlayer } = usePlayerStore();
  const player = getPlayer();
  const { isRoomOver } = useGameStateStore();

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <h2 className="mb-1">{player.name}</h2>
        {/* Display statuses */}
        {player.statuses.length > 0 && (
          <div className="flex justify-center items-center ml-3">
            {player.statuses.map((status) => (
              <StatusEffect key={status.id} status={status} />
            ))}
          </div>
        )}
      </div>

      {/* Player health and action points */}
      <div className="w-[600px] ml-auto mr-auto text-left flex justify-center items-center">
        <div
          className={clsx("flex items-center", {
            "mr-10": !isRoomOver,
          })}
        >
          <p className="mr-2">HP:</p>
          <p>
            {player.health} / {player.maxHealth}
          </p>
        </div>
        {!isRoomOver && (
          <div className="flex items-center">
            <p className="mr-2">AP: </p>
            <ActionPoints />
          </div>
        )}
      </div>
    </>
  );
};
