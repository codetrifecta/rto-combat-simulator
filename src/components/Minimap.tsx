import { FC } from 'react';
import { useFloorStore } from '../store/floor';
import { ROOM_TYPE } from '../utils/floor';
import { IRoom } from '../types';
import clsx from 'clsx';

export const Minimap: FC = () => {
  const { floor } = useFloorStore();

  return (
    <div className="relative bg-zinc-900 p-5 border-white border inline-block">
      {floor.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((room, roomIndex) => (
            <RoomNode key={roomIndex} room={room} />
          ))}
        </div>
      ))}
    </div>
  );
};

const RoomNode: FC<{ room: IRoom }> = ({ room }) => {
  return (
    <div className={`w-6 h-6 p-1 bg-zinc-900`}>
      <div
        className={clsx('w-full h-full', {
          'bg-green-500': room.type === ROOM_TYPE.START,
          'bg-red-500': room.type === ROOM_TYPE.BOSS,
          'bg-blue-500': room.type === ROOM_TYPE.COMMON,
        })}
      ></div>
    </div>
  );
};
