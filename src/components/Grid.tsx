import { FC } from "react";
import { GRID_SIZE } from "../constants";
import clsx from "clsx";
import { PlayerState } from "../types";

const className = `border-2 border-gray hover:border-black bg-white cursor-pointer `;

export const Grid: FC<{ playerState: PlayerState }> = ({ playerState }) => {
  return (
    <div
      style={{ width: GRID_SIZE, height: GRID_SIZE }}
      className={clsx(className, {
        "hover:bg-red-500": playerState.isAttacking,
        "hover:bg-blue-500": playerState.isMoving,
      })}
    ></div>
  );
};
