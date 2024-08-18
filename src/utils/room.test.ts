import { TILE_TYPE } from '../constants/tile';
import { describe, expect, it } from 'vitest';
import {
  initBoolMatrix,
  initRoomWithOnlyFloors,
  roomToStringArray,
} from './room';
import { ENTITY_TYPE } from '../constants/entity';

describe('Initialize Floor-Only Room', () => {
  it('returns a 1x1 2D array of floor tiles', () => {
    const room = initRoomWithOnlyFloors(1);

    let isFloor = true;
    for (let row = 0; row < 1; row++) {
      for (let col = 0; col < 1; col++) {
        if (room[row][col] !== TILE_TYPE.FLOOR) {
          isFloor = false;
          break;
        }
      }
    }

    expect(isFloor).toBe(true);
  });

  it('returns a 2x2 2D array of floor tiles', () => {
    const room = initRoomWithOnlyFloors(2);

    let isFloor = true;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        if (room[row][col] !== TILE_TYPE.FLOOR) {
          isFloor = false;
          break;
        }
      }
    }

    expect(isFloor).toBe(true);
  });

  it('returns a 3x3 2D array of floor tiles', () => {
    const room = initRoomWithOnlyFloors(3);

    let isFloor = true;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (room[row][col] !== TILE_TYPE.FLOOR) {
          isFloor = false;
          break;
        }
      }
    }

    expect(isFloor).toBe(true);
  });

  it('returns a 4x4 2D array of floor tiles', () => {
    const room = initRoomWithOnlyFloors(4);

    let isFloor = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (room[row][col] !== TILE_TYPE.FLOOR) {
          isFloor = false;
          break;
        }
      }
    }

    expect(isFloor).toBe(true);
  });
});

describe('Intialize boolean matrix', () => {
  it('returns a 1x1 2D array of false booleans', () => {
    const matrix = initBoolMatrix(1);

    let isFalse = true;
    for (let row = 0; row < 1; row++) {
      for (let col = 0; col < 1; col++) {
        if (matrix[row][col] !== false) {
          isFalse = false;
          break;
        }
      }
    }

    expect(isFalse).toBe(true);
  });

  it('returns a 2x2 2D array of false booleans', () => {
    const matrix = initBoolMatrix(2);

    let isFalse = true;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        if (matrix[row][col] !== false) {
          isFalse = false;
          break;
        }
      }
    }

    expect(isFalse).toBe(true);
  });

  it('returns a 3x3 2D array of false booleans', () => {
    const matrix = initBoolMatrix(3);

    let isFalse = true;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row][col] !== false) {
          isFalse = false;
          break;
        }
      }
    }

    expect(isFalse).toBe(true);
  });

  it('returns a 4x4 2D array of true booleans', () => {
    const matrix = initBoolMatrix(4, true);

    let isFalse = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (matrix[row][col] !== true) {
          isFalse = false;
          break;
        }
      }
    }

    expect(isFalse).toBe(true);
  });

  it('returns a 5x5 2D array of true booleans', () => {
    const matrix = initBoolMatrix(5, true);

    let isFalse = true;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] !== true) {
          isFalse = false;
          break;
        }
      }
    }

    expect(isFalse).toBe(true);
  });
});

describe('Print Room', () => {
  it('prints a 1x1 room with no entities', () => {
    const room = initRoomWithOnlyFloors(1);
    const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>();

    const roomStrArr = roomToStringArray(room, roomEntityPositions);

    expect(roomStrArr).toStrictEqual([' . ']);
  });

  it('prints a 3x3 room with no entities', () => {
    const room = initRoomWithOnlyFloors(3);
    const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>();

    const roomStrArr = roomToStringArray(room, roomEntityPositions);

    expect(roomStrArr).toStrictEqual([' . . . ', ' . . . ', ' . . . ']);
  });

  it('prints a 7x7 room with some walls', () => {
    const room = initRoomWithOnlyFloors(7);
    room[2][2] = TILE_TYPE.WALL;
    room[2][3] = TILE_TYPE.WALL;
    room[2][4] = TILE_TYPE.WALL;

    const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>();

    const roomStrArr = roomToStringArray(room, roomEntityPositions);

    expect(roomStrArr).toStrictEqual([
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . # # # . . ',
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . . . . . . ',
    ]);
  });

  it('prints a 7x7 room with some walls and player entity', () => {
    const room = initRoomWithOnlyFloors(7);
    room[2][2] = TILE_TYPE.WALL;
    room[2][3] = TILE_TYPE.WALL;
    room[2][4] = TILE_TYPE.WALL;

    const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);

    const roomStrArr = roomToStringArray(room, roomEntityPositions);

    expect(roomStrArr).toStrictEqual([
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . # # # . . ',
      ' . . . P . . . ',
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . . . . . . ',
    ]);
  });

  it('prints a 7x7 room with some walls, player, and enemy entities', () => {
    const room = initRoomWithOnlyFloors(7);
    room[2][2] = TILE_TYPE.WALL;
    room[2][3] = TILE_TYPE.WALL;
    room[2][4] = TILE_TYPE.WALL;

    const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
    roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);
    roomEntityPositions.set('5,6', [ENTITY_TYPE.ENEMY, 3]);

    const roomStrArr = roomToStringArray(room, roomEntityPositions);

    expect(roomStrArr).toStrictEqual([
      ' . . . . . . . ',
      ' . . . . . . . ',
      ' . . # # # . . ',
      ' . . . P . E . ',
      ' . . . . . . . ',
      ' . . . . . . E ',
      ' . . . . . . . ',
    ]);
  });
});
