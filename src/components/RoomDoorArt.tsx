import { FC, useEffect, useRef } from 'react';

// import defaultRoom from '../assets/sprites/tiles/room_demo_door.png';
import northDoor from '../assets/sprites/tiles/tutorial/room_tutorial_door_north.png';
import southDoor from '../assets/sprites/tiles/tutorial/room_tutorial_door_south.png';
import eastDoor from '../assets/sprites/tiles/tutorial/room_tutorial_door_east.png';
import westDoor from '../assets/sprites/tiles/tutorial/room_tutorial_door_west.png';
import { TILE_SIZE } from '../constants/tile';
import { useGameStateStore } from '../store/game';
import { useFloorStore } from '../store/floor';

export const RoomDoorArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ width, height, grayscale }) => {
  const { isRoomOver, floorArtFile } = useGameStateStore();

  const { currentRoom } = useFloorStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onLoad = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement
  ) => {
    if (!context) return;
    context.imageSmoothingEnabled = false;

    if (grayscale) {
      context.filter = 'grayscale(1)';
    }

    const width = (image.naturalWidth / 16) * TILE_SIZE;
    const height = (image.naturalHeight / 16) * TILE_SIZE;

    context.drawImage(image, 0, 0, width, height);
  };

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('No canvas ref');
      return;
    }

    if (!currentRoom) {
      console.error('No current room');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('No canvas');
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('No context');
      return;
    }

    context.reset();

    const northDoorImg = new Image();
    const southDoorImg = new Image();
    const eastDoorImg = new Image();
    const westDoorImg = new Image();

    if (!isRoomOver) {
      return;
    } else {
      console.log('currentRoom', currentRoom);
      if (currentRoom.isCleared) {
        if (currentRoom.northDoor) {
          northDoorImg.src = northDoor;
          northDoorImg.onload = () => onLoad(context, northDoorImg);
        }

        if (currentRoom.southDoor) {
          southDoorImg.src = southDoor;
          southDoorImg.onload = () => onLoad(context, southDoorImg);
        }

        if (currentRoom.eastDoor) {
          // console.log('east door');
          eastDoorImg.src = eastDoor;
          eastDoorImg.onload = () => onLoad(context, eastDoorImg);
        }

        if (currentRoom.westDoor) {
          westDoorImg.src = westDoor;
          westDoorImg.onload = () => onLoad(context, westDoorImg);
        }
      }
    }
  }, [
    canvasRef.current,
    width,
    height,
    grayscale,
    isRoomOver,
    floorArtFile,
    currentRoom,
  ]);

  return (
    <canvas
      className="relative pointer-events-none"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
