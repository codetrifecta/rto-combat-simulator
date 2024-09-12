import { describe, expect, it } from 'vitest';
import { IFloor, IRoom } from '../types';
import {
  connectAdjacentRooms,
  floorToStringArray,
  generateFloorPlan,
} from './floor';
import { BASE_ROOM, ROOM_TYPE } from '../constants/room';

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
  it('returns a 5x5 layout of type IRoom, with start in the middle bottom row.', () => {
    const floor1: ROOM_TYPE[][] = [
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

    // The IRoom matrix with the correct sequence of variables
    const adjRoomsAnswer1: IFloor = floor1.map((row) =>
      row.map((roomType) => {
        const adjRoom: IRoom = { ...BASE_ROOM };
        adjRoom.type = roomType;
        return adjRoom;
      })
    );

    // Connect the rooms
    adjRoomsAnswer1[0][4].southDoor = true;

    adjRoomsAnswer1[1][3].eastDoor = true;
    adjRoomsAnswer1[1][3].southDoor = true;

    adjRoomsAnswer1[1][4].westDoor = true;
    adjRoomsAnswer1[1][4].southDoor = true;
    adjRoomsAnswer1[1][4].northDoor = true;

    adjRoomsAnswer1[2][0].eastDoor = true;

    adjRoomsAnswer1[2][1].westDoor = true;
    adjRoomsAnswer1[2][1].southDoor = true;
    adjRoomsAnswer1[2][1].eastDoor = true;

    adjRoomsAnswer1[2][2].westDoor = true;
    adjRoomsAnswer1[2][2].southDoor = true;
    adjRoomsAnswer1[2][2].eastDoor = true;

    adjRoomsAnswer1[2][3].northDoor = true;
    adjRoomsAnswer1[2][3].westDoor = true;
    adjRoomsAnswer1[2][3].southDoor = true;
    adjRoomsAnswer1[2][3].eastDoor = true;

    adjRoomsAnswer1[2][4].northDoor = true;
    adjRoomsAnswer1[2][4].westDoor = true;
    adjRoomsAnswer1[2][4].southDoor = true;

    adjRoomsAnswer1[3][1].northDoor = true;
    adjRoomsAnswer1[3][1].eastDoor = true;
    adjRoomsAnswer1[3][1].southDoor = true;

    adjRoomsAnswer1[3][2].northDoor = true;
    adjRoomsAnswer1[3][2].eastDoor = true;
    adjRoomsAnswer1[3][2].westDoor = true;
    adjRoomsAnswer1[3][2].southDoor = true;

    adjRoomsAnswer1[3][3].eastDoor = true;
    adjRoomsAnswer1[3][3].westDoor = true;
    adjRoomsAnswer1[3][3].northDoor = true;

    adjRoomsAnswer1[3][4].westDoor = true;
    adjRoomsAnswer1[3][4].northDoor = true;

    adjRoomsAnswer1[4][1].eastDoor = true;
    adjRoomsAnswer1[4][1].northDoor = true;

    adjRoomsAnswer1[4][2].westDoor = true;
    adjRoomsAnswer1[4][2].northDoor = true;

    const adjRooms1: IFloor = connectAdjacentRooms(floor1);

    let isAdjRoomsCorrect1 = true;

    for (let i = 0; i < floor1.length; i++) {
      for (let j = 0; j < floor1.length; j++) {
        if (
          adjRooms1[i][j].northDoor !== adjRoomsAnswer1[i][j].northDoor ||
          adjRooms1[i][j].southDoor !== adjRoomsAnswer1[i][j].southDoor ||
          adjRooms1[i][j].eastDoor !== adjRoomsAnswer1[i][j].eastDoor ||
          adjRooms1[i][j].westDoor !== adjRoomsAnswer1[i][j].westDoor
        ) {
          // console.log('Expected:', adjRooms1[i][j], 'at index:', i, j);
          // console.log('Actual:', adjRoomsAnswer1[i][j], 'at index:', i, j);
          isAdjRoomsCorrect1 = false;
          break;
        }
      }
      if (!isAdjRoomsCorrect1) {
        break;
      }
    }

    expect(isAdjRoomsCorrect1).toBe(true);

    const floor2: ROOM_TYPE[][] = [
      [0, 3, 0, 4, 0],
      [0, 1, 1, 1, 1],
      [0, 1, 1, 1, 5],
      [0, 1, 0, 0, 0],
      [0, 1, 2, 0, 0],
    ];
    /*
      [
        ' # B # M # ',
        ' # . . . . ',
        ' # . . . $ ',
        ' # . # # # ',
        ' # . S # # '
      ]
    */

    // The IRoom matrix with the correct sequence of variables
    const adjRoomsAnswer2: IFloor = floor2.map((row) =>
      row.map((roomType) => {
        const adjRoom: IRoom = { ...BASE_ROOM };
        adjRoom.type = roomType;
        return adjRoom;
      })
    );

    // Connect the rooms
    adjRoomsAnswer2[0][1].southDoor = true;

    adjRoomsAnswer2[0][3].southDoor = true;

    adjRoomsAnswer2[1][1].northDoor = true;
    adjRoomsAnswer2[1][1].eastDoor = true;
    adjRoomsAnswer2[1][1].southDoor = true;

    adjRoomsAnswer2[1][2].southDoor = true;
    adjRoomsAnswer2[1][2].westDoor = true;
    adjRoomsAnswer2[1][2].eastDoor = true;

    adjRoomsAnswer2[1][3].eastDoor = true;
    adjRoomsAnswer2[1][3].westDoor = true;
    adjRoomsAnswer2[1][3].northDoor = true;
    adjRoomsAnswer2[1][3].southDoor = true;

    adjRoomsAnswer2[1][4].westDoor = true;
    adjRoomsAnswer2[1][4].southDoor = true;

    adjRoomsAnswer2[2][1].northDoor = true;
    adjRoomsAnswer2[2][1].southDoor = true;
    adjRoomsAnswer2[2][1].eastDoor = true;

    adjRoomsAnswer2[2][2].westDoor = true;
    adjRoomsAnswer2[2][2].northDoor = true;
    adjRoomsAnswer2[2][2].eastDoor = true;

    adjRoomsAnswer2[2][3].northDoor = true;
    adjRoomsAnswer2[2][3].westDoor = true;
    adjRoomsAnswer2[2][3].eastDoor = true;

    adjRoomsAnswer2[2][4].northDoor = true;
    adjRoomsAnswer2[2][4].westDoor = true;

    adjRoomsAnswer2[3][1].northDoor = true;
    adjRoomsAnswer2[3][1].southDoor = true;

    adjRoomsAnswer2[4][1].eastDoor = true;
    adjRoomsAnswer2[4][1].northDoor = true;

    adjRoomsAnswer2[4][2].westDoor = true;

    const adjRooms2: IFloor = connectAdjacentRooms(floor2);

    let isAdjRoomsCorrect2 = true;

    for (let i = 0; i < floor2.length; i++) {
      for (let j = 0; j < floor2.length; j++) {
        if (
          adjRooms2[i][j].northDoor !== adjRoomsAnswer2[i][j].northDoor ||
          adjRooms2[i][j].southDoor !== adjRoomsAnswer2[i][j].southDoor ||
          adjRooms2[i][j].eastDoor !== adjRoomsAnswer2[i][j].eastDoor ||
          adjRooms2[i][j].westDoor !== adjRoomsAnswer2[i][j].westDoor
        ) {
          // console.log('Expected:', adjRooms2[i][j], 'at index:', i, j);
          // console.log('Actual:', adjRoomsAnswer2[i][j], 'at index:', i, j);
          isAdjRoomsCorrect2 = false;
          break;
        }
      }
      if (!isAdjRoomsCorrect2) {
        break;
      }
    }

    expect(isAdjRoomsCorrect2).toBe(true);
  });

  it('returns a 5x5 layout of type IRoom, with start in the middle middle row', () => {
    const floor1: ROOM_TYPE[][] = [
      [1, 1, 1, 1, 1],
      [1, 1, 0, 5, 1],
      [1, 1, 2, 0, 1],
      [0, 1, 0, 0, 3],
      [0, 4, 0, 0, 0],
    ];
    /*
      [
        ' . . . . . ',
        ' . . # $ . ',
        ' . . S # . ',
        ' # . # # B ',
        ' # M # # # '
      ]
     */

    // The IRoom matrix with the correct sequence of variables
    const adjRoomsAnswer1: IFloor = floor1.map((row) =>
      row.map((roomType) => {
        const adjRoom: IRoom = { ...BASE_ROOM };
        adjRoom.type = roomType;
        return adjRoom;
      })
    );

    // Connect the rooms
    adjRoomsAnswer1[0][0].southDoor = true;
    adjRoomsAnswer1[0][0].eastDoor = true;

    adjRoomsAnswer1[0][1].southDoor = true;
    adjRoomsAnswer1[0][1].eastDoor = true;
    adjRoomsAnswer1[0][1].westDoor = true;

    adjRoomsAnswer1[0][2].westDoor = true;
    adjRoomsAnswer1[0][2].eastDoor = true;

    adjRoomsAnswer1[0][3].southDoor = true;
    adjRoomsAnswer1[0][3].eastDoor = true;
    adjRoomsAnswer1[0][3].westDoor = true;

    adjRoomsAnswer1[0][4].westDoor = true;
    adjRoomsAnswer1[0][4].southDoor = true;

    adjRoomsAnswer1[1][0].northDoor = true;
    adjRoomsAnswer1[1][0].southDoor = true;
    adjRoomsAnswer1[1][0].eastDoor = true;

    adjRoomsAnswer1[1][1].northDoor = true;
    adjRoomsAnswer1[1][1].westDoor = true;
    adjRoomsAnswer1[1][1].southDoor = true;

    adjRoomsAnswer1[1][3].eastDoor = true;
    adjRoomsAnswer1[1][3].northDoor = true;

    adjRoomsAnswer1[1][4].westDoor = true;
    adjRoomsAnswer1[1][4].southDoor = true;
    adjRoomsAnswer1[1][4].northDoor = true;

    adjRoomsAnswer1[2][0].eastDoor = true;
    adjRoomsAnswer1[2][0].northDoor = true;

    adjRoomsAnswer1[2][1].westDoor = true;
    adjRoomsAnswer1[2][1].southDoor = true;
    adjRoomsAnswer1[2][1].eastDoor = true;
    adjRoomsAnswer1[2][1].northDoor = true;

    adjRoomsAnswer1[2][2].westDoor = true;

    adjRoomsAnswer1[2][4].northDoor = true;
    adjRoomsAnswer1[2][4].southDoor = true;

    adjRoomsAnswer1[3][1].northDoor = true;
    adjRoomsAnswer1[3][1].southDoor = true;

    adjRoomsAnswer1[3][4].northDoor = true;

    adjRoomsAnswer1[4][1].northDoor = true;

    const adjRooms1: IFloor = connectAdjacentRooms(floor1);

    let isAdjRoomsCorrect1 = true;

    for (let i = 0; i < floor1.length; i++) {
      for (let j = 0; j < floor1.length; j++) {
        if (
          adjRooms1[i][j].northDoor !== adjRoomsAnswer1[i][j].northDoor ||
          adjRooms1[i][j].southDoor !== adjRoomsAnswer1[i][j].southDoor ||
          adjRooms1[i][j].eastDoor !== adjRoomsAnswer1[i][j].eastDoor ||
          adjRooms1[i][j].westDoor !== adjRoomsAnswer1[i][j].westDoor
        ) {
          console.log('Expected:', adjRooms1[i][j], 'at index:', i, j);
          console.log('Actual:', adjRoomsAnswer1[i][j], 'at index:', i, j);
          isAdjRoomsCorrect1 = false;
          break;
        }
      }
      if (!isAdjRoomsCorrect1) {
        break;
      }
    }

    expect(isAdjRoomsCorrect1).toBe(true);

    const floor2: ROOM_TYPE[][] = [
      [3, 0, 0, 0, 5],
      [1, 0, 0, 0, 1],
      [1, 1, 2, 1, 1],
      [0, 1, 0, 0, 0],
      [0, 4, 0, 0, 0],
    ];
    /*
      [
        ' B # # # $ ',
        ' . # # # . ',
        ' . . S . . ',
        ' # . # # # ',
        ' # M # # # '
      ]
    */

    // The IRoom matrix with the correct sequence of variables
    const adjRoomsAnswer2: IFloor = floor2.map((row) =>
      row.map((roomType) => {
        const adjRoom: IRoom = { ...BASE_ROOM };
        adjRoom.type = roomType;
        return adjRoom;
      })
    );

    // Connect the rooms
    adjRoomsAnswer2[0][0].southDoor = true;

    adjRoomsAnswer2[0][4].southDoor = true;

    adjRoomsAnswer2[1][0].northDoor = true;
    adjRoomsAnswer2[1][0].southDoor = true;

    adjRoomsAnswer2[1][4].northDoor = true;
    adjRoomsAnswer2[1][4].southDoor = true;

    adjRoomsAnswer2[2][0].northDoor = true;
    adjRoomsAnswer2[2][0].eastDoor = true;

    adjRoomsAnswer2[2][1].westDoor = true;
    adjRoomsAnswer2[2][1].southDoor = true;
    adjRoomsAnswer2[2][1].eastDoor = true;

    adjRoomsAnswer2[2][2].westDoor = true;
    adjRoomsAnswer2[2][2].eastDoor = true;

    adjRoomsAnswer2[2][3].westDoor = true;
    adjRoomsAnswer2[2][3].eastDoor = true;

    adjRoomsAnswer2[2][4].northDoor = true;
    adjRoomsAnswer2[2][4].westDoor = true;

    adjRoomsAnswer2[3][1].northDoor = true;
    adjRoomsAnswer2[3][1].southDoor = true;

    adjRoomsAnswer2[4][1].northDoor = true;

    const adjRooms2: IFloor = connectAdjacentRooms(floor2);

    let isAdjRoomsCorrect2 = true;

    for (let i = 0; i < floor2.length; i++) {
      for (let j = 0; j < floor2.length; j++) {
        if (
          adjRooms2[i][j].northDoor !== adjRoomsAnswer2[i][j].northDoor ||
          adjRooms2[i][j].southDoor !== adjRoomsAnswer2[i][j].southDoor ||
          adjRooms2[i][j].eastDoor !== adjRoomsAnswer2[i][j].eastDoor ||
          adjRooms2[i][j].westDoor !== adjRoomsAnswer2[i][j].westDoor
        ) {
          // console.log('Expected:', adjRooms2[i][j], 'at index:', i, j);
          // console.log('Actual:', adjRoomsAnswer2[i][j], 'at index:', i, j);
          isAdjRoomsCorrect2 = false;
          break;
        }
      }
      if (!isAdjRoomsCorrect2) {
        break;
      }
    }

    expect(isAdjRoomsCorrect2).toBe(true);
  });
});
