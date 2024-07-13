import clsx from "clsx";
import { FC } from "react";

export const IconButton: FC<{
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean | undefined | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ children, onClick, disabled, onMouseEnter, onMouseLeave }) => {
  return (
    <button
      className={clsx(
        "relative p-0 m-0 w-14 h-14 flex items-center justify-center hover:border-white hover:border-2 box-border"
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};
