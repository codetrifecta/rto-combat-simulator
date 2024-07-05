import { FC } from "react";
import { IStatus } from "../types";
import { Tooltip } from "./Tooltip";

export const StatusEffect: FC<{ status: IStatus }> = ({ status }) => {
  return (
    <div
      key={status.id}
      className="relative group w-[30px] h-[30px] border border-white flex justify-center items-center"
    >
      {status.id}
      <Tooltip>
        <h2>{status.name}</h2>
        <p>{status.description}</p>
        <p className="">Lasts {status.duration} more turns.</p>
      </Tooltip>
    </div>
  );
};
