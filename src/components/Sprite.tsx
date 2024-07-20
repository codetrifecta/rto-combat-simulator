import { FC, useEffect, useRef } from 'react';
import { getSpriteSrc, SPRITE_ID } from '../constants/sprites';

export const Sprite: FC<{
  sprite: SPRITE_ID;
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ sprite, width, height, grayscale }) => {
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
    image.src = getSpriteSrc(sprite);

    image.onload = function () {
      if (!context) return;
      context.reset();
      context.imageSmoothingEnabled = false;

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      context.drawImage(image, 0, 0, width, height);
    };
  }, [sprite, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};
