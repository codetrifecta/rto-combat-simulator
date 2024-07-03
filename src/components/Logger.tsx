import { FC, forwardRef } from "react";
import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { useLogStore } from "../store/log";
import { ILog } from "../types";
import clsx from "clsx";

export const Logger: FC = () => {
  const { logs } = useLogStore();

  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-white border"
      style={{ maxHeight: ROOM_LENGTH * TILE_SIZE }}
    >
      <h2 className="mb-5 pb-3 w-full border-b">Game Log</h2>
      {logs.map((log, index) => {
        // Focus on the latest log

        if (index === logs.length - 1) {
          return (
            <LogItem
              key={index}
              log={log}
              ref={(ref) => {
                if (ref) {
                  ref.scrollIntoView();
                }
              }}
            />
          );
        } else {
          return <LogItem key={index} log={log} />;
        }
      })}
    </div>
  );
};

const LogItem = forwardRef<HTMLDivElement, { log: ILog }>(({ log }, ref) => {
  const bgColor = log.type === "info" ? "bg-neutral-800" : "bg-red-950";

  return (
    <div className={clsx("mb-2 rounded-md py-1 px-3", bgColor)} ref={ref}>
      <p className="text-left"> {log.message}</p>
    </div>
  );
});
