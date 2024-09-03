import clsx from 'clsx';
import { FC } from 'react';

export const IconButton: FC<{
  children: string | JSX.Element | JSX.Element[];
  onClick?: () => void | undefined | null;
  disabled?: boolean | undefined | null;
  active?: boolean | undefined | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  grayscale?: boolean;
}> = ({
  children,
  onClick,
  disabled,
  active,
  onMouseEnter,
  onMouseLeave,
  grayscale,
}) => {
  return (
    <button
      className={clsx(
        'peer relative p-0 m-0 flex items-center justify-center border-2 box-border bg-zinc-800 w-full h-full',
        {
          'hover:border-white': !active,
          'cursor-not-allowed opacity-50': disabled,
          'cursor-pointer hover:border-gray':
            !disabled && onClick !== undefined,
          'border-primary-500': !disabled,
          'border-yellow-500 ': active,
          'cursor-auto': !onClick,
          grayscale: grayscale,
        }
      )}
      onClick={() => {
        if (!disabled && onClick) onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};
