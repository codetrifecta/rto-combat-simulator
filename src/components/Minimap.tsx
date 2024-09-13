import { FC } from 'react';
import { useFloorStore } from '../store/floor';
import { ROOM_TYPE } from '../constants/room';
import { IRoom } from '../types';
import clsx from 'clsx';

export const Minimap: FC = () => {
  const { floor, currentRoom } = useFloorStore();

  return (
    <div className="relative bg-zinc-900 p-5 border-white border inline-block">
      {floor.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((room, roomIndex) => (
            <RoomNode
              key={roomIndex}
              room={room}
              active={currentRoom ? currentRoom.id === room.id : false}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const RoomNode: FC<{ room: IRoom; active: boolean }> = ({ room, active }) => {
  return (
    <div className={`w-8 h-8 p-1 bg-zinc-900`}>
      <div
        className={clsx('w-full h-full flex justify-center items-center p-2', {
          'bg-green-500': room.type === ROOM_TYPE.START,
          'bg-red-500': room.type === ROOM_TYPE.BOSS,
          'bg-blue-500': room.type === ROOM_TYPE.COMMON,
        })}
      >
        {active && (
          <div className={clsx('bg-black rounded-full w-2 h-2')}></div>
        )}
      </div>
    </div>
  );
};
