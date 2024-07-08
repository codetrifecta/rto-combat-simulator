import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";

export const Tooltip: FC<{ children: ReactNode; active: boolean }> = ({
  children,
  active,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRect = ref.current?.getBoundingClientRect();

  useEffect(() => {
    // When parent element is initialized, set the tooltip position
    if (ref.current?.parentElement) {
      const tooltipRect = ref.current.getBoundingClientRect();

      // Check if parent component is at the top half of the screen
      let isTop = false;
      const screenHeight = document.documentElement.clientHeight;
      if (tooltipRect?.top && tooltipRect.top < screenHeight / 2) {
        isTop = true;
      } else {
        isTop = false;
      }

      // Set tooltip position to top or bottom of parent element
      if (isTop) {
        ref.current.style.bottom = `-${tooltipRect.height + 10}px`;
      } else {
        ref.current.style.top = `-${tooltipRect.height + 10}px`;
      }

      // Set tooltip position to middle of parent element
      ref.current.style.left = `${
        (ref.current.parentElement.clientWidth - tooltipRect.width) / 2
      }px`;
    }
  }, [ref.current?.parentElement, tooltipRect]);

  return (
    <div
      className={clsx(
        "absolute inline-block bg-neutral-900 text-white p-2 rounded-lg shadow-lg transition-all ease duration-200 w-[300px]",
        { "opacity-100 z-50": active },
        { "opacity-0 z-[-10]": !active }
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};
