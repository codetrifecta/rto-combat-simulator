import { FC, useEffect, useRef } from 'react';

import defaultRoomArt from '../assets/sprites/tiles/room_open_cavern_2.png';
import defaultRoomOpenArt from '../assets/sprites/tiles/room_open_cavern_2.png';
import { TILE_SIZE } from '../constants/tile';
import { useGameStateStore } from '../store/game';

export const RoomArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ width, height, grayscale }) => {
  const { isRoomOver, file } = useGameStateStore();

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

    let imgSrc = file;

    if (!imgSrc) {
      imgSrc = defaultRoomArt;
    }

    if (isRoomOver && imgSrc === defaultRoomArt) {
      imgSrc = defaultRoomOpenArt;
    }

    image.src = imgSrc;

    image.onload = function () {
      if (!context) return;
      context.reset();
      context.imageSmoothingEnabled = false;

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      const width = (image.naturalWidth / 16) * TILE_SIZE;
      const height = (image.naturalHeight / 16) * TILE_SIZE;

      context.drawImage(image, 0, 0, width, height);
    };
  }, [canvasRef.current, width, height, grayscale, isRoomOver, file]);

  return (
    <canvas
      className="relative"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
