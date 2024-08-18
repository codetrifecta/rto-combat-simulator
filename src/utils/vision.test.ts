import { describe, expect, it } from 'vitest';
import {
  initBoolMatrix,
  initRoomWithOnlyFloors,
  roomToStringArray,
} from './room';
import { ENTITY_TYPE } from '../constants/entity';
import { getVisionFromEntityPosition } from './vision';
import { TILE_TYPE } from '../constants/tile';

/**
 * DEFAULT PARAMETERS:
 * room = room (11x11)
 * startLoc = [5, 5] (middle of room)
 * skillRadius = 2 (5x5 room)
 * roomEntityPositions = roomEntityPositions (empty map) - CAN IGNORE FOR NOW SINCE NO BLOCKING FOR ENTITIES
 * numRays = 360 (default)
 */

const MOCK_EMPTY_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
  new Map();

// ROOM TESTING
describe('Casting Ray Vision in an empty Room', () => {
  it('returns a boolean grid of size 5x5, no entities and walls', () => {
    const room = initRoomWithOnlyFloors(5);
    const startLoc: [number, number] = [2, 2]; // Middle of room
    const numRays = 360;
    const skillRadius = 1; // 3x3 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap: boolean[][] = [
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ];
    /*
    [
      ' X X X X X ',
      ' X . . . X ',
      ' X . . . X ',
      ' X . . . X ',
      ' X X X X X '
    ]
    */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities and walls', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [5, 5]; // Middle of room
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }
    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));
    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 13x13, no entities and walls', () => {
    const room = initRoomWithOnlyFloors(13);
    const startLoc: [number, number] = [6, 6]; // Middle of room
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(13, false);
    const trueIndices = [
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }
    /*
    [
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X . . . . . X X X X ',
      ' X X X X . . . . . X X X X ',
      ' X X X X . . . . . X X X X ',
      ' X X X X . . . . . X X X X ',
      ' X X X X . . . . . X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X ',
      ' X X X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });
});

// ROOM TESTING WITH WALLS
describe('Casting Ray Vision in an empty Room with Walls', () => {
  it('returns a boolean grid of size 11x11, no entities, with walls version 1', () => {
    const room = initRoomWithOnlyFloors(11);
    room[4][5] = TILE_TYPE.WALL;
    room[6][5] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 3x3 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 3],
      [3, 4],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 3],
      [7, 4],
      [7, 6],
      [7, 7],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }
    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X . . X . . X X X ',
      ' X X X . . # . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . # . . X X X ',
      ' X X X . . X . . X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with walls version 2', () => {
    const room = initRoomWithOnlyFloors(11);
    room[5][4] = TILE_TYPE.WALL;
    room[5][6] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 3x3 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 4],
      [5, 5],
      [5, 6],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }
    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X X # . # X X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with walls version 3', () => {
    const room = initRoomWithOnlyFloors(11);
    room[4][4] = TILE_TYPE.WALL;
    room[6][6] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }

    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X . . . . X X X ',
      ' X X X . # . . . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . . . # . X X X ',
      ' X X X . . . . X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with walls version 4', () => {
    const room = initRoomWithOnlyFloors(11);
    room[4][5] = TILE_TYPE.WALL;
    room[6][5] = TILE_TYPE.WALL;
    room[5][4] = TILE_TYPE.WALL;
    room[5][6] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 3],
      [3, 4],
      [3, 4],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 4],
      [5, 5],
      [5, 6],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 3],
      [7, 4],
      [7, 6],
      [7, 7],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }

    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X . . X . . X X X ',
      ' X X X . . # . . X X X ',
      ' X X X X # . # X X X X ',
      ' X X X . . # . . X X X ',
      ' X X X . . X . . X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
     */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with walls version 5', () => {
    const room = initRoomWithOnlyFloors(11);
    room[4][4] = TILE_TYPE.WALL;
    room[6][6] = TILE_TYPE.WALL;
    room[4][6] = TILE_TYPE.WALL;
    room[6][4] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 4],
      [3, 5],
      [3, 6],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [7, 4],
      [7, 5],
      [7, 6],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }

    /*
    [
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X . . . X X X X ',
      ' X X X . # . # . X X X ',
      ' X X X . . . . . X X X ',
      ' X X X . # . # . X X X ',
      ' X X X X . . . X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X ',
      ' X X X X X X X X X X X '
    ]
    */

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with walls version 6', () => {
    const room = initRoomWithOnlyFloors(11);
    room[4][4] = TILE_TYPE.WALL;
    room[6][6] = TILE_TYPE.WALL;
    room[4][6] = TILE_TYPE.WALL;
    room[6][5] = TILE_TYPE.WALL;
    room[5][6] = TILE_TYPE.WALL;
    const startLoc: [number, number] = [5, 5];
    const numRays = 360;
    const skillRadius = 2; // 5x5 range
    let isRoomVisible = true;

    const visionMap = getVisionFromEntityPosition(
      room,
      startLoc,
      skillRadius,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      numRays
    );

    const expectedMap: boolean[][] = initBoolMatrix(11, false);
    const trueIndices = [
      [3, 4],
      [3, 5],
      [3, 6],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [7, 3],
      [7, 4],
    ];
    for (const index of trueIndices) {
      expectedMap[index[0]][index[1]] = true;
    }

    /*
      [
        [ X X X X X X X X X X X ]
        [ X X X X X X X X X X X ]
        [ X X X X X X X X X X X ]
        [ X X X X . . . X X X X ]
        [ X X X . # . # X X X X ]
        [ X X X . . . # X X X X ]
        [ X X X . . # # X X X X ]
        [ X X X . . X X X X X X ]
        [ X X X X X X X X X X X ]
        [ X X X X X X X X X X X ]
        [ X X X X X X X X X X X ]
     ]
     */

    // console.log(expectedMap);

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] !== expectedMap[i][j]) {
          isRoomVisible = false;
          console.log(i, j);
          break;
        }
      }
    }

    // Output the grid
    // console.log(roomToStringArray(room, new Map(), visionMap));

    expect(isRoomVisible).toBe(true);
  });
});

// ENTITY (PLAYER/ENEMY) LOCATION
// describe('Casting Ray Vision in an Empty Room with Different Starting Locations', () => {
//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [5, 5] (Middle)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [0, 5] (Top Edge)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [0, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [10, 5] (Bottom Edge)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [10, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [5, 10] (Right Edge)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 10];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [0, 10] (Top-Right Corner)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [0, 10];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with start at [10, 10] (Bottom-Right Corner)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [10, 10];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });
// });

// // SKILL RADIUS
// describe('Casting Ray Vision in an Empty Room with Different Skill Radii', () => {
//   it('returns a boolean grid of size 11x11, no entities and walls, with skill radius 1 (3x3)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with skill radius 2 (5x5)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 2; // 5x5 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities and walls, with skill radius 4 (9x9)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 4; // 9x9 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });
// });

// // ROOM ENTITY POSITION (IGNORE FOR NOW)
// describe('Casting Ray Vision in a Room with Different Room Entity (Enemy) Variations', () => {
//   it('returns a boolean grid of size 11x11, no walls, with one enemy (enitity)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,5', [ENTITY_TYPE.ENEMY, 1]);

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no walls, with two enemies (entities)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,5', [ENTITY_TYPE.ENEMY, 1]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,6', [ENTITY_TYPE.ENEMY, 2]);

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no walls, with three enemies (entities)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,5', [ENTITY_TYPE.ENEMY, 1]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,6', [ENTITY_TYPE.ENEMY, 2]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('3,5', [ENTITY_TYPE.ENEMY, 3]);

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no walls, with four enemies (entities)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,5', [ENTITY_TYPE.ENEMY, 1]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,6', [ENTITY_TYPE.ENEMY, 2]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('3,5', [ENTITY_TYPE.ENEMY, 3]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('6,4', [ENTITY_TYPE.ENEMY, 4]);

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no walls, with five enemies (entities)', () => {
//     const room = initRoomWithOnlyFloors(11);
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 360;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,4', [ENTITY_TYPE.ENEMY, 1]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('6,6', [ENTITY_TYPE.ENEMY, 2]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('4,6', [ENTITY_TYPE.ENEMY, 3]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('6,5', [ENTITY_TYPE.ENEMY, 4]);
//     MOCK_EMPTY_ROOM_ENTITY_POSITIONS.set('5,6', [ENTITY_TYPE.ENEMY, 5]);

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });
// });

// // NUMBER OF RAYS
// describe('Casting Ray Vision in an empty Room with Walls with Different Number of Rays', () => {
//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 45 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 45;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 90 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 90;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 135 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 135;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 180 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 180;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 225 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 225;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 270 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 270;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });

//   it('returns a boolean grid of size 11x11, no entities, with walls version 6 and 315 rays', () => {
//     const room = initRoomWithOnlyFloors(11);
//     room[4][4] = TILE_TYPE.WALL;
//     room[6][6] = TILE_TYPE.WALL;
//     room[4][6] = TILE_TYPE.WALL;
//     room[6][5] = TILE_TYPE.WALL;
//     room[5][6] = TILE_TYPE.WALL;
//     const startLoc: [number, number] = [5, 5];
//     const numRays = 315;
//     const skillRadius = 1; // 3x3 range
//     let isRoomVisible = true;

//     const visionMap = getVisionFromEntityPosition(
//       room,
//       startLoc,
//       skillRadius,
//       MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
//       numRays
//     );

//     for (let i = 0; i < room.length; i++) {
//       for (let j = 0; j < room[0].length; j++) {
//         if (visionMap[i][j] == false) {
//           isRoomVisible = false;
//         }
//       }
//     }

//     // // Output the grid
//     // for (let i = 0; i < room.length; i++) {
//     //   let row = '[ ';
//     //   for (let j = 0; j < room[i].length; j++) {
//     //     if (validityMap[i][j]) {
//     //       // If the tile is visible
//     //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
//     //         // If the tile is a floor
//     //         row += '. ';
//     //       } else {
//     //         // If the tile is a wall
//     //         row += '# ';
//     //       }
//     //     } else {
//     //       // If the tile is not visible
//     //       row += 'X ';
//     //     }
//     //   }
//     //   row += ']';
//     //   console.log(row);
//     // }

//     expect(isRoomVisible).toBe(true);
//   });
// });

// MIX OF VARIABLES
