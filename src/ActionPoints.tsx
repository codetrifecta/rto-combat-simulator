import { type FC } from "react";
import { MAX_ACTION_POINTS } from "./constants";

// Display action points as circles
export const ActionPoints: FC<{ actionPoints: number }> = ({
  actionPoints,
}) => {
  return (
    <div className="flex gap-2 justify-start items-center">
      {Array.from({ length: actionPoints }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 border-2 bg-yellow-300 rounded-full"
        ></div>
      ))}
      {Array.from({ length: MAX_ACTION_POINTS - actionPoints }).map(
        (_, index) => (
          <div key={index} className="w-4 h-4 border-2 rounded-full"></div>
        )
      )}
    </div>
  );
};
