import { FC } from "react";
import { IPlayer } from "../types";
import { ActionPoints } from "./ActionPoints";
import { useGameStateStore } from "../store/game";
import clsx from "clsx";
import { StatusEffect } from "./StatusEffect";

export const PlayerInfo: FC<{ player: IPlayer }> = ({ player }) => {
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
          <p className="mr-2">Health:</p>
          <p>{player.health} / 10</p>
        </div>
        {!isRoomOver && (
          <div className="flex items-center">
            <p className="mr-2">Action Points: </p>
            <ActionPoints player={player} />
          </div>
        )}
      </div>
    </>
  );
};
