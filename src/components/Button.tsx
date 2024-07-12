import clsx from "clsx";
import { FC } from "react";

export const Button: FC<{
  children: string;
  onClick: () => void;
  disabled?: boolean | undefined | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  neutral?: boolean;
}> = ({ children, onClick, disabled, onMouseEnter, onMouseLeave, neutral }) => {
  return (
    <button
      className={clsx(
        " text-white font-bold py-2 px-4 rounded text-lg",
        { "bg-blue-500": !neutral },
        { "bg-neutral-500": neutral },
        { "hover:bg-blue-700": !disabled && !neutral },
        { "hover:bg-neutral-700": !disabled && neutral },
        { "opacity-50 pointer-event-none cursor-default": disabled }
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // disabled={disabled || false}
    >
      {children}
    </button>
  );
};
