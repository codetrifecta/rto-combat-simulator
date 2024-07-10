import { FC } from "react";
import { ActionPoints } from "./ActionPoints";
import { useGameStateStore } from "../store/game";
import clsx from "clsx";
import { StatusEffect } from "./StatusEffect";
import { usePlayerStore } from "../store/player";
import { Healthbar } from "./Healthbar";

export const PlayerInfo: FC = () => {
  const { getPlayer } = usePlayerStore();
  const player = getPlayer();
  const { isRoomOver } = useGameStateStore();

  return (
    <div className="flex flex-col justify-center  w-full">
      {/* Display statuses */}
      {player.statuses.length > 0 && (
        <div className="flex justify-center items-center mb-3">
          {player.statuses.map((status) => (
            <StatusEffect key={status.id} status={status} />
          ))}
        </div>
      )}

      {/* Player health and action points */}
      <div className="w-full ml-auto mr-auto text-left flex flex-col justify-center items-center">
        {!isRoomOver && (
          <div className="mb-3">
            <ActionPoints />
          </div>
        )}
        <div
          className={clsx(
            "flex items-center w-[400px] border border-white py-2 px-3 bg-neutral-900"
          )}
        >
          <Healthbar entity={player} />
        </div>
      </div>
    </div>
  );
};
