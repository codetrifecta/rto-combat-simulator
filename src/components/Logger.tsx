import { FC, forwardRef, useEffect, useRef } from "react";
import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { useLogStore } from "../store/log";
import { ILog } from "../types";
import clsx from "clsx";

export const Logger: FC = () => {
  const { logs } = useLogStore();

  const loggerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the logger when a new log is added
  useEffect(() => {
    if (loggerRef.current && bottomRef.current) {
      loggerRef.current.scrollTop = bottomRef.current.offsetTop;
    }
  }, [logs]);

  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-white border"
      style={{ maxHeight: ROOM_LENGTH * TILE_SIZE }}
      ref={(ref) => (loggerRef.current = ref)}
    >
      <h2 className="mb-5 pb-3 w-full border-b">Game Log</h2>
      {logs.map((log, index) => (
        <LogItem key={index} log={log} />
      ))}
      <div
        tabIndex={0}
        ref={(ref) => {
          if (ref) {
            bottomRef.current = ref;
          }
        }}
      ></div>
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
