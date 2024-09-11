import { describe, expect, it } from 'vitest';
import { IRoomNode } from '../types';
import {
  connectAdjacentRooms,
  floorToStringArray,
  generateFloorPlan,
  // connectAdjacentRooms,
  ROOM_TYPE,
} from './floor';

describe('Initialize Floor Layout', () => {
  it('returns a 5x5 array layout of rooms, that start in the middle bottom row', () => {
    const floor = generateFloorPlan(true);

    console.log(floorToStringArray(floor));

    // Expect the number of rows to be 5
    expect(floor.length).toBe(5);

    // Expect the number of columns to be 5 each
    for (let row = 0; row < floor.length; row++) {
      expect(floor[row].length).toBe(5);
    }
  });

  it('returns a 5x5 array layout of rooms, that start in the middle middle row', () => {
    const floor = generateFloorPlan(false);

    console.log(floorToStringArray(floor));

    // Expect the number of rows to be 5
    expect(floor.length).toBe(5);

    // Expect the number of columns to be 5 each
    for (let row = 0; row < floor.length; row++) {
      expect(floor[row].length).toBe(5);
    }
  });

  it('returns a 5x5 array layout of at least 1 common, 1 miniboss, 1 boss and 1 shop room', () => {
    const floor = generateFloorPlan(true);

    console.log(floorToStringArray(floor));

    let hasCommon = false;
    let hasMiniboss = false;
    let hasBoss = false;
    let hasShop = false;

    // Expect the number of columns to be 5 each
    for (let row = 0; row < floor.length; row++) {
      for (let col = 0; col < floor[row].length; col++) {
        if (floor[row][col] === ROOM_TYPE.COMMON) {
          hasCommon = true;
        } else if (floor[row][col] === ROOM_TYPE.MINIBOSS) {
          hasMiniboss = true;
        } else if (floor[row][col] === ROOM_TYPE.BOSS) {
          hasBoss = true;
        } else if (floor[row][col] === ROOM_TYPE.SHOP) {
          hasShop = true;
        }
      }
    }

    expect(hasCommon && hasMiniboss && hasBoss && hasShop).toBe(true);
  });
});

describe('Determine Adjacent Rooms', () => {
  it('returns a 5x5 layout of type IRoomNode, with start in the middle bottom row. Configuration 1', () => {
    const floor: ROOM_TYPE[][] = [
      [0, 0, 0, 0, 3],
      [0, 0, 0, 5, 1],
      [4, 1, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 0, 0],
    ];
    /**
     * [
     *  ' # # # # B ',
     *  ' # # # $ . ',
     *  ' M . . . . ',
     *  ' # . . . . ',
     *  ' # . S # # '
     * ]
     */

    // The IRoomNode matrix with the correct sequence of variables
    const adjRoomsAnswer: IRoomNode[][] = floor.map((row) =>
      row.map((roomType) => {
        const adjRoom: IRoomNode = {
          type: roomType,
          explored: false,
          eastDoor: false,
          westDoor: false,
          northDoor: false,
          southDoor: false,
        };
        return adjRoom;
      })
    );

    const adjRooms: IRoomNode[][] = connectAdjacentRooms(floor);

    let isAdjRoomsCorrect = true;

    for (let i = 0; i < floor.length; i++) {
      for (let j = 0; j < floor.length; j++) {
        if (
          adjRooms[i][j].explored !== adjRoomsAnswer[i][j].explored ||
          adjRooms[i][j].northDoor !== adjRoomsAnswer[i][j].northDoor ||
          adjRooms[i][j].southDoor !== adjRoomsAnswer[i][j].southDoor ||
          adjRooms[i][j].eastDoor !== adjRoomsAnswer[i][j].eastDoor ||
          adjRooms[i][j].westDoor !== adjRoomsAnswer[i][j].westDoor
        ) {
          isAdjRoomsCorrect = false;
        }
      }
    }

    expect(isAdjRoomsCorrect).toBe(true);
  });

  // it('returns a 5x5 layout of type IRoomNode, with start in the middle bottom row. Configuration 2', () => {});

  // it('returns a 5x5 layout of type IRoomNode, with start in the middle middle row. Configuration 1', () => {});

  // it('returns a 5x5 layout of type IRoomNode, with start in the middle middle row. Configuration 2', () => {});
});
