import { FC, useRef } from "react";
import { IStatus } from "../types";
import clsx from "clsx";

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

const Tooltip: FC<{ children: JSX.Element[] }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRect = ref.current?.getBoundingClientRect();

  // Check if parent component is at the top half of the screen
  let isTop = false;
  const screenHeight = document.documentElement.clientHeight;
  if (tooltipRect?.top && tooltipRect.top < screenHeight / 2) {
    isTop = true;
  }

  console.log(isTop, tooltipRect?.top, screenHeight);

  return (
    <div
      className={clsx(
        "absolute inline-block opacity-0 group-hover:opacity-100 z-[-10] group-hover:z-10 bg-neutral-900 text-white p-2 rounded-lg shadow-lg transition-all ease duration-200 w-[250px]",
        {
          "bottom-[40px]": !isTop,
          "top-[40px]": isTop,
        }
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};
