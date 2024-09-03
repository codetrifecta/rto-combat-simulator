import clsx from 'clsx';
import { FC, ReactNode, useEffect, useRef } from 'react';

export const Tooltip: FC<{
  children: ReactNode;
  active?: boolean;
  width?: number;
}> = ({
  children,
  width = 300,
  // active = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRect = ref.current?.getBoundingClientRect();

  useEffect(() => {
    const initializeTooltipPosition = () => {
      // When parent element is initialized, set the tooltip position
      if (ref.current?.parentElement) {
        const tooltipRect = ref.current.getBoundingClientRect();

        // Check if parent component is at the top half of the screen
        let isTop = false;
        const screenHeight = document.documentElement.clientHeight;

        if (tooltipRect.top < screenHeight * 0.4) {
          isTop = true;
        } else {
          isTop = false;
        }

        // Set tooltip position to top or bottom of parent element
        if (isTop) {
          if (ref.current.parentElement.id.startsWith('compendium')) {
            // For some reason, the tooltip is not showing up correctly for skills in the compendium,
            // so the tooltip is forced to be at the top of the parent element for now.
            ref.current.style.top = `-${tooltipRect.height + 10}px`;
            ref.current.style.bottom = '';
          } else {
            ref.current.style.bottom = `-${tooltipRect.height + 10}px`;
            ref.current.style.top = '';
          }
        } else {
          ref.current.style.top = `-${tooltipRect.height + 10}px`;
          ref.current.style.bottom = '';
        }

        // Set tooltip position to middle of parent element
        ref.current.style.left = `${
          (ref.current.parentElement.clientWidth - tooltipRect.width) / 2
        }px`;
      }
    };

    initializeTooltipPosition();
  }, [ref.current, ref.current?.parentElement, tooltipRect, children]);

  return (
    <div
      className={clsx(
        'absolute inline-block bg-neutral-900 text-white p-2 rounded-lg shadow-sm shadow-black transition-all ease duration-200 w-[300px] opacity-0 invisible peer-hover:opacity-100 peer-hover:z-50 peer-hover:visible pointer-events-none'
      )}
      ref={ref}
      style={{ width }}
    >
      {children}
    </div>
  );
};
