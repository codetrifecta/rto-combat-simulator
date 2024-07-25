import { FC, useEffect, useRef } from 'react';
import { getIconSrc, ICON_ID } from '../constants/icon';

export const Icon: FC<{
  icon: ICON_ID;
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ icon, width, height, grayscale }) => {
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

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};
