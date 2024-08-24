import { FC, useEffect, useRef } from 'react';
import { getSpriteSrc, SPRITE_ID } from '../constants/sprite';
import clsx from 'clsx';

export const Sprite: FC<{
  id: string;
  sprite: SPRITE_ID;
  backgroundSprite?: SPRITE_ID;
  width: number;
  height: number;
  className?: string;
  grayscale?: boolean;
  children?: React.ReactNode;
}> = ({
  id,
  sprite,
  backgroundSprite,
  width,
  height,
  className,
  grayscale,
  children,
}) => {
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
      // context.globalCompositeOperation = 'destination-over';

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      if (backgroundSprite) {
        const background = new Image();

        background.src = getSpriteSrc(backgroundSprite);
        background.onload = function () {
          context.drawImage(background, 0, 0, width, height);
          context.drawImage(image, 0, 0, width, height);
        };
      } else {
        context.drawImage(image, 0, 0, width, height);
      }
    };
  }, [sprite, width, height, grayscale]);

  return (
    <canvas
      className={clsx('relative', className)}
      id={id}
      ref={canvasRef}
      width={width}
      height={height}
    >
      {children}
    </canvas>
  );
};
