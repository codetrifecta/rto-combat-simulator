import { FC } from "react";
import { IPlayer } from "../types";
import { ActionPoints } from "./ActionPoints";
import { useGameStateStore } from "../store/game";
import clsx from "clsx";

export const PlayerInfo: FC<{ player: IPlayer }> = ({ player }) => {
  const { isRoomOver } = useGameStateStore();

  return (
    <>
      <h2 className="mb-1">Player Info</h2>
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
