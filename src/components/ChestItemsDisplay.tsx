import { FC } from 'react';
import { useGameStateStore } from '../store/game';

export const ChestItemsDisplay: FC = () => {
  const { setIsChestOpen } = useGameStateStore();

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full w-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsChestOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Chest Items</h2>
      </div>
      <div className="flex justify-center items-center h-full gap-2">
        <div className="w-14 h-14 bg-zinc-500 border border-white"></div>
        <div className="w-14 h-14 bg-zinc-500 border border-white"></div>
        <div className="w-14 h-14 bg-zinc-500 border border-white"></div>
        <div className="w-14 h-14 bg-zinc-500 border border-white"></div>
        <div className="w-14 h-14 bg-zinc-500 border border-white"></div>
      </div>
    </div>
  );
};
