import { FC } from "react";
import { PlayerState } from "./types";
import { ActionPoints } from "./ActionPoints";

export const PlayerInfo: FC<{ playerState: PlayerState }> = ({
  playerState,
}) => {
  return (
    <>
      <h2 className="mb-2">Player Info</h2>
      <div className="w-[300px] ml-auto mr-auto text-left grid grid-rows-2 grid-cols-2 gap-1">
        <p>Health: </p>
        <p>{playerState.health}</p>
        <p>Action Points: </p>
        <ActionPoints actionPoints={playerState.actionPoints} />
      </div>
    </>
  );
};
