import { TILE_TYPE } from '../constants/tile';
import { describe, expect, it } from 'vitest';
import { initRoomWithOnlyFloors } from './room';

describe('Initialize Room', () => {
  it('returns a 1x1 2D array of floor tiles', () => {
    const room = initRoomWithOnlyFloors(1);

    let isFloor = true;
    for (let row = 0; row < 1; row++) {
      for (let col = 0; col < 1; col++) {
        if (room[row][col][0] !== TILE_TYPE.FLOOR) {
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
        if (room[row][col][0] !== TILE_TYPE.FLOOR) {
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
        if (room[row][col][0] !== TILE_TYPE.FLOOR) {
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
        if (room[row][col][0] !== TILE_TYPE.FLOOR) {
          isFloor = false;
          break;
        }
      }
    }

    expect(isFloor).toBe(true);
  });
});
