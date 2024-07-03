import { type FC } from "react";
import { MAX_ACTION_POINTS } from "./constants";
import { IPlayerState } from "./types";

// Display action points as circles
export const ActionPoints: FC<{
  actionPoints: number;
  playerState: IPlayerState;
}> = ({ actionPoints, playerState }) => {
  const emptyActionPoints = MAX_ACTION_POINTS - actionPoints;
  let usedActionPoints = 0;

  if (playerState.isAttacking) {
    usedActionPoints = 1;
  }

  const availableActionPoints = actionPoints - usedActionPoints;

  return (
    <div className="flex gap-2 justify-start items-center">
      {Array.from({ length: availableActionPoints }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 border-2 bg-yellow-300 rounded-full"
        ></div>
      ))}
      {Array.from({ length: usedActionPoints }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 border-2 bg-red-500 rounded-full"
        ></div>
      ))}
      {Array.from({ length: emptyActionPoints }).map((_, index) => (
        <div key={index} className="w-4 h-4 border-2 rounded-full"></div>
      ))}
    </div>
  );
};
