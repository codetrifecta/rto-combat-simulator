import clsx from "clsx";
import { FC } from "react";

export const IconButton: FC<{
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean | undefined | null;
  active?: boolean | undefined | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ children, onClick, disabled, active, onMouseEnter, onMouseLeave }) => {
  return (
    <button
      className={clsx(
        "peer relative p-0 m-0 flex items-center justify-center border-2 hover:border-white hover:border-2 box-border hover:border-gray",
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-pointer": !disabled,
          "border-primary-500": !disabled,
          "border-white": active,
        }
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
