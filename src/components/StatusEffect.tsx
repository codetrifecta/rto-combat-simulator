import { FC } from 'react';
import { IStatus } from '../types';
import { Tooltip } from './Tooltip';
import { Icon } from './Icon';

export const StatusEffect: FC<{ status: IStatus; stacks: number }> = ({
  status,
  stacks = 1,
}) => {
  return (
    <div
      key={status.id}
      className="relative bg-neutral-900 group w-[30px] h-[30px] border border-white flex justify-center items-center cursor-default"
    >
      <div className="relative peer">
        <Icon icon={status.icon} width={30} height={30} />
      </div>

      <Tooltip>
        <h2>{status.name}</h2>
        {stacks > 1 ? <p>Stacks: {stacks}</p> : null}
        <p>{status.description}</p>
        <p className="">Lasts {status.durationCounter} more turns.</p>
      </Tooltip>
    </div>
  );
};
