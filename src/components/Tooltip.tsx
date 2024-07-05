import { FC, useRef } from "react";

export const Tooltip: FC<{ children: JSX.Element[] }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRect = ref.current?.getBoundingClientRect();

  // Check if parent component is at the top half of the screen
  let isTop = false;
  const screenHeight = document.documentElement.clientHeight;
  if (tooltipRect?.top && tooltipRect.top < screenHeight / 2) {
    isTop = true;
  }

  if (ref.current && tooltipRect) {
    if (isTop) {
      ref.current.style.bottom = `-${tooltipRect.height + 10}px`;
    } else {
      ref.current.style.top = `-${tooltipRect.height + 10}px`;
    }
  }

  return (
    <div
      className={
        "absolute inline-block opacity-0 group-hover:opacity-100 z-[-10] group-hover:z-50 bg-neutral-900 text-white p-2 rounded-lg shadow-lg transition-all ease duration-200 w-[250px]"
      }
      ref={ref}
    >
      {children}
    </div>
  );
};
