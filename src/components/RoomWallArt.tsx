import { FC, useEffect, useRef } from 'react';

import defaultRoomArt from '../assets/sprites/tiles/room_wall_cavern_2.png';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import { useGameStateStore } from '../store/game';

export const RoomWallArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ width, height, grayscale }) => {
  const { isRoomOver, file, roomEntityPositions, roomTileMatrix } =
    useGameStateStore();

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
      imgSrc = defaultRoomArt;
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

      // For each entity that is covered by the wall, modify the alpha channel of the wall
      // Get the image data from the canvas
      // imageData contains width and height of the image or region and a data array seen below
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // The data array is a one-dimensional array that contains the color information for each pixel.
      // Each pixel's color information is stored as four consecutive values in the data array:
      // Red: The red component of the pixel (0–255).
      // Green: The green component of the pixel (0–255).
      // Blue: The blue component of the pixel (0–255).
      // Alpha: The alpha (opacity) component of the pixel (0–255).
      const data = imageData.data;

      console.log(data);

      Array.from(roomEntityPositions).forEach(([positionString]) => {
        const [row, col] = positionString.split(',').map(Number);

        // Skip if no tile nearby is a wall (in this case, check for the tile right below the entity)
        if (roomTileMatrix[row + 1][col] !== TILE_TYPE.WALL) {
          return;
        }

        const rowStart = row * TILE_SIZE;
        const colStart = col * TILE_SIZE;

        const rowEnd = rowStart + TILE_SIZE;
        const colEnd = colStart + TILE_SIZE;

        // Modify the alpha channel for a specific area
        for (let y = rowStart; y < rowEnd; y++) {
          for (let x = colStart; x < colEnd; x++) {
            const index = (y * imageData.width + x) * 4;

            // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
            if (
              data[index] !== 0 &&
              data[index + 1] !== 0 &&
              data[index + 2] !== 0
            ) {
              data[index + 3] = 128; // Set alpha to 50% (128 out of 255)
            }
          }
        }
      });

      // Put the modified image data back on the canvas
      context.putImageData(imageData, 0, 0);
    };
  }, [
    canvasRef.current,
    width,
    height,
    grayscale,
    isRoomOver,
    file,
    roomEntityPositions,
    roomTileMatrix,
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
