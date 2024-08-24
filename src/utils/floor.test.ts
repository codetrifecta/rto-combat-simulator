import { describe, expect, it } from 'vitest';
import { floorToStringArray, generateFloorPlan } from './floor';

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
});
