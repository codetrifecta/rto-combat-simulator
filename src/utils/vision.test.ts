import { describe, expect, it } from 'vitest';
import { initRoomWithOnlyFloors } from './room';
import { ENTITY_TYPE } from '../constants/entity';
import { getVisionFromEntityPosition } from './vision';

// const MOCK_ROOM = initRoomWithOnlyFloors(11);
const MOCK_EMPTY_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
  new Map();

describe('Casting Ray Vision in a Room', () => {
  it('returns a boolean grid of size 5x5, no entities', () => {
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 9x9, no entities', () => {
    const room = initRoomWithOnlyFloors(9);
    const startLoc: [number, number] = [4, 4]; // Middle of room
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 13x13, no entities', () => {
    const room = initRoomWithOnlyFloors(13);
    const startLoc: [number, number] = [6, 6]; // Middle of room
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with start at [5, 5]', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [5, 5];
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with start at [0, 5]', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [0, 5];
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with start at [10, 5]', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [10, 5];
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with start at [0, 10]', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [0, 10];
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });

  it('returns a boolean grid of size 11x11, no entities, with start at [10, 10]', () => {
    const room = initRoomWithOnlyFloors(11);
    const startLoc: [number, number] = [10, 10];
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

    for (let i = 0; i < room.length; i++) {
      for (let j = 0; j < room[0].length; j++) {
        if (visionMap[i][j] == false) {
          isRoomVisible = false;
        }
      }
    }

    // // Output the grid
    // for (let i = 0; i < room.length; i++) {
    //   let row = '[ ';
    //   for (let j = 0; j < room[i].length; j++) {
    //     if (validityMap[i][j]) {
    //       // If the tile is visible
    //       if (room[i][j][0] == TILE_TYPE.FLOOR) {
    //         // If the tile is a floor
    //         row += '. ';
    //       } else {
    //         // If the tile is a wall
    //         row += '# ';
    //       }
    //     } else {
    //       // If the tile is not visible
    //       row += 'X ';
    //     }
    //   }
    //   row += ']';
    //   console.log(row);
    // }

    expect(isRoomVisible).toBe(true);
  });
});
