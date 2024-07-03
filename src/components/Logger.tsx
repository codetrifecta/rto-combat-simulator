import { FC } from "react";
import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { useLogStore } from "../store/log";
import { ILog } from "../types";

export const Logger = () => {
  const { logs } = useLogStore();

  return (
    <div
      className="bg-zinc-900 overflow-auto p-5 border-white border"
      style={{ maxHeight: ROOM_LENGTH * TILE_SIZE }}
    >
      <h2 className="mb-5 pb-3 w-full border-b">Logger</h2>
      {logs.map((log, index) => (
        <LogItem key={index} log={log} />
      ))}
    </div>
  );
};

const LogItem: FC<{ log: ILog }> = ({ log }) => {
  switch (log.type) {
    case "info":
      return (
        <div className="flex mb-2 items-center rounded-md bg-neutral-800 px-2">
          <p>{log.message}</p>
        </div>
      );
    case "error":
      return (
        <div className="flex mb-2 items-center rounded-md bg-red-950 px-2">
          <p>{log.message}</p>
        </div>
      );
    default:
      return <div />;
  }
};
