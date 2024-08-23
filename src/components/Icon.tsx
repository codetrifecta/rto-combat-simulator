import { FC, useEffect, useRef } from 'react';
import { getIconSrc, ICON_ID } from '../constants/icon';
import clsx from 'clsx';

export const Icon: FC<{
  icon: ICON_ID;
  width: number;
  height: number;
  className?: string;
  grayscale?: boolean;
}> = ({ icon, width, height, className, grayscale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const image = new Image();
    image.src = getIconSrc(icon);

    image.onload = function () {
      if (!context) return;
      context.reset();
      context.imageSmoothingEnabled = false;

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      context.drawImage(image, 0, 0, width, height);
    };
  }, [icon, width, height]);

  return (
    <canvas
      className={clsx(className)}
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
