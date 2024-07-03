import { FC } from "react";
import { IPlayer } from "../types";
import { ActionPoints } from "./ActionPoints";

export const PlayerInfo: FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <>
      <h2 className="mb-1">Player Info</h2>
      <div className="w-[600px] ml-auto mr-auto text-left flex justify-center items-center">
        <div className="flex items-center mr-10">
          <p className="mr-2">Health:</p>
          <p>{player.health} / 10</p>
        </div>
        <div className="flex items-center">
          <p className="mr-2">Action Points: </p>
          <ActionPoints
            actionPoints={player.actionPoints}
            playerState={player.state}
          />
        </div>
      </div>
    </>
  );
};
