import { FC, forwardRef, useEffect, useRef } from 'react';
// import { ROOM_LENGTH, TILE_SIZE } from "../constants";
import { useLogStore } from '../store/log';
import { ILog } from '../types';
import clsx from 'clsx';
import { useGameStateStore } from '../store/game';

export const Logger: FC = () => {
  const { logs } = useLogStore();

  const { setIsGameLogOpen } = useGameStateStore();

  const loggerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the logger when a new log is added
  useEffect(() => {
    if (loggerRef.current && bottomRef.current) {
      loggerRef.current.scrollTop = bottomRef.current.offsetTop;
    }
  }, [logs]);

  return (
    <div className="relative group opacity-30 hover:opacity-100 bg-zinc-900 p-5 border-white border w-full h-full max-h-[465px] transition-all ease-in-out duration-300">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsGameLogOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Game Log</h2>
      </div>

      <div
        className="overflow-auto max-h-[360px]"
        ref={(ref) => (loggerRef.current = ref)}
      >
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
    </div>
  );
};

const LogItem = forwardRef<HTMLDivElement, { log: ILog }>(({ log }, ref) => {
  const bgColor = log.type === 'info' ? 'bg-neutral-800' : 'bg-red-950';

  return (
    <div className={clsx('mb-2 rounded-md py-1 px-3', bgColor)} ref={ref}>
      <p className="text-left text-white"> {log.message}</p>
    </div>
  );
});
LogItem.displayName = 'LogItem';
