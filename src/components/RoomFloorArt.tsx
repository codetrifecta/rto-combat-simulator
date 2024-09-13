import { FC, useEffect, useRef } from 'react';

import defaultRoom from '../assets/sprites/tiles/tutorial/room_tutorial_floor.png';
import { TILE_SIZE } from '../constants/tile';
import { useGameStateStore } from '../store/game';
import { useFloorStore } from '../store/floor';

export const RoomFloorArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ width, height, grayscale }) => {
  const { isRoomOver, floorArtFile } = useGameStateStore();

  const { currentRoom } = useFloorStore();

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

    if (!currentRoom) {
      console.error('RoomFloorArt: No current room');
      return;
    }

    let imgSrc = currentRoom.artFloor;

    if (!imgSrc) {
      imgSrc = defaultRoom;
    }

    if (isRoomOver && imgSrc === defaultRoom) {
      imgSrc = defaultRoom;
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
  }, [canvasRef.current, width, height, grayscale, isRoomOver, floorArtFile]);

  return (
    <canvas
      className="relative"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
