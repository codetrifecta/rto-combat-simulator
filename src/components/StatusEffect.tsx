import { FC, useState } from "react";
import { IStatus } from "../types";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";

export const StatusEffect: FC<{ status: IStatus }> = ({ status }) => {
  const [isStatusHovered, setIsStatusHovered] = useState(false);

  return (
    <div
      key={status.id}
      className="relative bg-neutral-900 group w-[30px] h-[30px] border border-white flex justify-center items-center cursor-default"
      onMouseEnter={() => setIsStatusHovered(true)}
      onMouseLeave={() => setIsStatusHovered(false)}
    >
      <Tooltip active={isStatusHovered}>
        <h2>{status.name}</h2>
        <p>{status.description}</p>
        <p className="">Lasts {status.durationCounter} more turns.</p>
      </Tooltip>
      <Icon icon={status.icon} width={30} height={30} />
    </div>
  );
};
