import { FC, useEffect, useRef } from 'react';

import defaultRoomArt from '../assets/sprites/tiles/room_demo_obstacle.png';
import { TILE_SIZE, TILE_TYPE } from '../constants/tile';
import { useGameStateStore } from '../store/game';
// import { ENTITY_TYPE } from '../constants/entity';
import { ROOM_LENGTH } from '../constants/game';

export const RoomObstacleArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ grayscale }) => {
  const {
    isRoomOver,
    wallArtFile,
    roomEntityPositions,
    roomTileMatrix,
    hoveredTile,
  } = useGameStateStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create a canvas element and draw the wall art on it
  // Modify the alpha channel of the wall art based on the entities that are covered by the wall art
  // Modify the alpha channel of the wall art based on the hovered tile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();

    let imgSrc = wallArtFile;

    // if (!imgSrc) {
    // }
    imgSrc = defaultRoomArt;

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

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const data = imageData.data;

      // Change alpha channel for tiles that have entities covered by the wall
      Array.from(roomEntityPositions).forEach(([positionString]) => {
        const [entityRow, entityCol] = positionString.split(',').map(Number);

        // // Skip if no tile nearby is a wall (in this case, check for the 2 tiles below the entity)
        // if (
        //   roomTileMatrix[entityRow + 1][entityCol] !== TILE_TYPE.OBSTACLE &&
        //   roomTileMatrix[entityRow + 2][entityCol] !== TILE_TYPE.OBSTACLE
        // ) {
        //   return;
        // }

        // Skip if no wall art is overlapping the entity
        let isWallArtOverlapping = false;
        for (
          let y = entityRow * TILE_SIZE;
          y < entityRow * TILE_SIZE + TILE_SIZE;
          y++
        ) {
          for (
            let x = entityCol * TILE_SIZE;
            x < entityCol * TILE_SIZE + TILE_SIZE;
            x++
          ) {
            const index = (y * imageData.width + x) * 4;

            // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
            if (
              data[index] !== 0 &&
              data[index + 1] !== 0 &&
              data[index + 2] !== 0
            ) {
              isWallArtOverlapping = true;
              break;
            }
          }
          if (isWallArtOverlapping) {
            break;
          }
        }

        if (isWallArtOverlapping === false) {
          return;
        }

        const startRow = entityRow * TILE_SIZE - TILE_SIZE;
        const startCol = entityCol * TILE_SIZE - TILE_SIZE;

        const endRow = startRow + TILE_SIZE + TILE_SIZE;
        const endCol = startCol + TILE_SIZE + TILE_SIZE + TILE_SIZE;

        // Modify the alpha channel for a specific area
        for (let y = startRow; y < endRow; y++) {
          for (let x = startCol; x < endCol; x++) {
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

      // Logic for hovered tiles
      // Modify the alpha channel for the hovered tile (if any)
      const [hoveredTileRow, hoveredTileCol] = hoveredTile ?? [-1, -1];

      // Skip if no tile is hovered
      if (hoveredTileRow === -1 || hoveredTileCol === -1) {
        // Do nothing if no tile is hovered
      } else {
        // Skip if no tile nearby is an obstacle (in this case, check for the 2 tiles below the entity)
        // console.log(hoveredTileRow, hoveredTileCol);
        if (
          roomTileMatrix[hoveredTileRow][hoveredTileCol] === TILE_TYPE.FLOOR &&
          ((hoveredTileRow + 1 < roomTileMatrix.length &&
            roomTileMatrix[hoveredTileRow + 1][hoveredTileCol] ===
              TILE_TYPE.OBSTACLE) ||
            (hoveredTileRow + 2 < roomTileMatrix.length &&
              roomTileMatrix[hoveredTileRow + 2][hoveredTileCol] ===
                TILE_TYPE.OBSTACLE))
        ) {
          // Modify the alpha channel for a specific area
          for (
            let y = hoveredTileRow * TILE_SIZE;
            y < hoveredTileRow * TILE_SIZE + TILE_SIZE;
            y++
          ) {
            for (
              let x = hoveredTileCol * TILE_SIZE;
              x < hoveredTileCol * TILE_SIZE + TILE_SIZE;
              x++
            ) {
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
        }
      }

      // Put the modified image data back on the canvas
      context.putImageData(imageData, 0, 0);
    };
  }, [
    canvasRef.current,
    grayscale,
    isRoomOver,
    wallArtFile,
    roomEntityPositions,
    hoveredTile,
  ]);

  return (
    <>
      {/* {roomTileMatrix.map((row, rowIndex) => {
        return row.map((_, colIndex) => {
          return (
            <WallTileArt
              key={`wall_tile_art_${rowIndex}_${colIndex}`}
              id={`wall_tile_art_${rowIndex}_${colIndex}`}
              row={rowIndex}
              col={colIndex}
              grayscale={grayscale}
              isRoomOver={isRoomOver}
              wallArtFile={wallArtFile}
              roomEntityPositions={roomEntityPositions}
              roomTileMatrix={roomTileMatrix}
              hoveredTile={hoveredTile}
            />
          );
        });
      })} */}
      <canvas
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          zIndex: 34,
        }}
        ref={canvasRef}
        width={TILE_SIZE * ROOM_LENGTH}
        height={TILE_SIZE * ROOM_LENGTH}
      ></canvas>
    </>
  );
};

// const WallTileArt: FC<{
//   id: string;
//   row: number;
//   col: number;
//   grayscale?: boolean;
//   isRoomOver: boolean;
//   wallArtFile: string;
//   roomEntityPositions: Map<string, [ENTITY_TYPE, number]>;
//   roomTileMatrix: TILE_TYPE[][];
//   hoveredTile: [number, number] | null;
// }> = ({
//   id,
//   row,
//   col,
//   grayscale,
//   isRoomOver,
//   wallArtFile,
//   roomEntityPositions,
//   roomTileMatrix,
//   // hoveredTile,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [zIndex, setZIndex] = useState(
//     col === 0 || col === ROOM_LENGTH - 1 ? 200 : 100 + row
//   );

//   useEffect(() => {
//     // Skip if there are no entities near the tile
//     // Array.from(roomEntityPositions).forEach(([positionString]) => {
//     //   const [entityRow, entityCol] = positionString.split(',').map(Number);

//     //   // Skip if any entity is not in a 3x3 tile around the current tile
//     //   if (
//     //     [row + 1, row, row + 1].includes(entityRow) === false ||
//     //     [col - 1, col, col + 1].includes(entityCol) === false
//     //   ) {
//     //     return;
//     //   }
//     // });

//     const canvas = canvasRef.current;
//     if (!canvas) {
//       return;
//     }

//     const context = canvas.getContext('2d', { willReadFrequently: true });
//     const anotherCanvas = document.createElement('canvas');
//     anotherCanvas.width = TILE_SIZE * ROOM_LENGTH;
//     anotherCanvas.height = TILE_SIZE * ROOM_LENGTH;
//     const anotherContext = anotherCanvas.getContext('2d', {
//       willReadFrequently: true,
//     });
//     if (!context || !anotherContext) {
//       return;
//     }

//     const image = new Image();

//     let imgSrc = wallArtFile;

//     if (!imgSrc) {
//       imgSrc = defaultRoomArt;
//     }

//     if (isRoomOver && imgSrc === defaultRoomArt) {
//       imgSrc = defaultRoomArt;
//     }

//     image.src = imgSrc;

//     image.onload = function () {
//       if (!context || !anotherContext) return;
//       context.reset();
//       context.imageSmoothingEnabled = false;

//       anotherContext.reset();
//       anotherContext.imageSmoothingEnabled = false;

//       if (grayscale) {
//         context.filter = 'grayscale(1)';
//       }

//       const sRow = row * 16;
//       const sCol = col * 16;

//       const width = (image.naturalWidth / 16) * TILE_SIZE;
//       const height = (image.naturalHeight / 16) * TILE_SIZE;

//       // console.log(width, height, anotherCanvas.width, anotherCanvas.height);

//       context.drawImage(image, sCol, sRow, 16, 16, 0, 0, TILE_SIZE, TILE_SIZE);

//       // Draw the entire wall art image on another canvas
//       anotherContext.drawImage(image, 0, 0, width, height);

//       // If tile below is a wall, set z-index to the same as the tile below
//       // For each entity that is covered by the wall, modify the alpha channel of the wall
//       // Get the image data from the canvas
//       // imageData contains width and height of the image or region and a data array seen below
//       // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const anotherImageData = anotherContext.getImageData(
//         0,
//         0,
//         anotherCanvas.width,
//         anotherCanvas.height
//       );

//       // The data array is a one-dimensional array that contains the color information for each pixel.
//       // Each pixel's color information is stored as four consecutive values in the data array:
//       // Red: The red component of the pixel (0–255).
//       // Green: The green component of the pixel (0–255).
//       // Blue: The blue component of the pixel (0–255).
//       // Alpha: The alpha (opacity) component of the pixel (0–255).
//       // const data = imageData.data;
//       // const anotherData = anotherImageData.data;

//       // Change z index for tiles that have wall art 1 pixel below them
//       // Only change z index if the tile below is a floor tile (because we want to render the wall above any entity that is on the floor)
//       // let noWallArtBelow = true;
//       // if (
//       //   row < roomTileMatrix.length - 1 &&
//       //   roomTileMatrix[row + 1][col] === TILE_TYPE.FLOOR
//       // ) {
//       //   const startRow = row * TILE_SIZE + TILE_SIZE;
//       //   const startCol = col * TILE_SIZE;

//       //   // Check if the tile below has any wall art
//       //   for (let y = startRow; y < startRow + 1; y++) {
//       //     for (let x = startCol; x < startCol + TILE_SIZE; x++) {
//       //       const index = (y * anotherImageData.width + x) * 4;

//       //       // console.log(
//       //       //   'wallArtBelow',
//       //       //   row,
//       //       //   col,
//       //       //   anotherData[index],
//       //       //   anotherData[index + 1],
//       //       //   anotherData[index + 2]
//       //       // );

//       //       // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
//       //       if (
//       //         anotherData[index] !== undefined &&
//       //         anotherData[index] !== 0 &&
//       //         anotherData[index + 1] !== 0 &&
//       //         anotherData[index + 2] !== 0
//       //       ) {
//       //         noWallArtBelow = false;
//       //         break;
//       //       }
//       //     }
//       //     if (noWallArtBelow === false) {
//       //       break;
//       //     }
//       //   }

//       //   if (noWallArtBelow === false) {
//       //     setZIndex(col === 0 || col === ROOM_LENGTH - 1 ? 200 : 100 + row + 1);
//       //   }
//       // }

//       // Change alpha channel for tiles that have entities covered by the wall
//       // Array.from(roomEntityPositions).forEach(([positionString]) => {
//       //   const [entityRow, entityCol] = positionString.split(',').map(Number);

//       //   // Skip if the entity is not the same as the 2x3 tile area
//       //   if (
//       //     [row + 1, row].includes(entityRow) === false ||
//       //     [col - 1, col, col + 1].includes(entityCol) === false
//       //   ) {
//       //     return;
//       //   }

//       //   // Skip if no tile nearby is a wall (in this case, check for the 2 tiles below the entity)
//       //   if (
//       //     roomTileMatrix[entityRow + 1][entityCol] !== TILE_TYPE.OBSTACLE &&
//       //     roomTileMatrix[entityRow + 2][entityCol] !== TILE_TYPE.OBSTACLE
//       //   ) {
//       //     return;
//       //   }

//       //   // Modify the alpha channel for a specific area
//       //   for (let y = 0; y < TILE_SIZE; y++) {
//       //     for (let x = 0; x < TILE_SIZE; x++) {
//       //       const index = (y * imageData.width + x) * 4;

//       //       // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
//       //       if (
//       //         data[index] !== 0 &&
//       //         data[index + 1] !== 0 &&
//       //         data[index + 2] !== 0
//       //       ) {
//       //         data[index + 3] = 128; // Set alpha to 50% (128 out of 255)
//       //       }
//       //     }
//       //   }
//       // });

//       // // Modify the alpha channel for the hovered tile (if any)
//       // const [hoveredTileRow, hoveredTileCol] = hoveredTile ?? [-1, -1];

//       // // Skip if no tile is hovered
//       // if (hoveredTileRow === -1 || hoveredTileCol === -1) {
//       //   return;
//       // } else {
//       //   // Skip if no tile nearby is a wall (in this case, check for the 2 tiles below the entity)
//       //   // console.log(hoveredTileRow, hoveredTileCol);
//       //   if (
//       //     row === hoveredTileRow && // Check if the hovered tile is the same as the current tile
//       //     col === hoveredTileCol && // Check if the hovered tile is the same as the current tile
//       //     roomTileMatrix[hoveredTileRow][hoveredTileCol] === TILE_TYPE.FLOOR &&
//       //     (roomTileMatrix[hoveredTileRow + 1][hoveredTileCol] === TILE_TYPE.OBSTACLE ||
//       //       roomTileMatrix[hoveredTileRow + 2][hoveredTileCol] === TILE_TYPE.OBSTACLE)
//       //   ) {
//       //     // Modify the alpha channel for a specific area
//       //     for (let y = 0; y < TILE_SIZE; y++) {
//       //       for (let x = 0; x < TILE_SIZE; x++) {
//       //         const index = (y * imageData.width + x) * 4;

//       //         // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
//       //         if (
//       //           data[index] !== 0 &&
//       //           data[index + 1] !== 0 &&
//       //           data[index + 2] !== 0
//       //         ) {
//       //           data[index + 3] = 128; // Set alpha to 50% (128 out of 255)
//       //         }
//       //       }
//       //     }
//       //   }
//       // }

//       // // Put the modified image data back on the canvas
//       // context.putImageData(imageData, 0, 0);
//     };
//   }, [
//     canvasRef.current,
//     grayscale,
//     isRoomOver,
//     wallArtFile,
//     roomEntityPositions,
//     roomTileMatrix,
//     // hoveredTile,
//     row,
//     col,
//   ]);

//   return (
//     <canvas
//       id={id}
//       className="absolute pointer-events-none"
//       style={{
//         top: row * TILE_SIZE,
//         left: col * TILE_SIZE,
//         zIndex: zIndex,
//       }}
//       ref={canvasRef}
//       width={TILE_SIZE}
//       height={TILE_SIZE}
//     ></canvas>
//   );
// };
