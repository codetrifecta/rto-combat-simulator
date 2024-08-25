import { describe, expect, it } from 'vitest';
import { floorToStringArray, generateFloorPlan, ROOM_TYPE } from './floor';

describe('Initialize Floor Layout', () => {
  it('returns a 5x5 array layout of rooms', () => {
    const floor = generateFloorPlan(true);

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
