import { findPathsFromCurrentLocation, getApCostForPath } from './pathfinding';
import { describe, expect, it } from 'vitest';
import { initRoomWithOnlyFloors } from './room';
import { ENTITY_TYPE } from '../constants/entity';

const room = initRoomWithOnlyFloors(11);
const MOCK_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
  new Map();

describe('Pathfinding and cost for Movement', () => {
  it('returns the path from the current location to the target location', () => {
    const startPos: [number, number] = [3, 3];

    const paths = findPathsFromCurrentLocation(
      startPos,
      room,
      1,
      MOCK_ROOM_ENTITY_POSITIONS
    );

    // Starting position should not be in the paths
    expect(paths.get('3,3')).toBeUndefined();

    // Target position should be in the paths
    expect(paths.get('3,4')).toStrictEqual([[3, 4]]);
    expect(paths.get('3,5')).toStrictEqual([
      [3, 4],
      [3, 5],
    ]);
    expect(paths.get('3,6')).toBeUndefined();

    return true;
  });

  it('returns the AP cost for the path', () => {
    const startPos: [number, number] = [3, 3];

    const paths = findPathsFromCurrentLocation(
      startPos,
      room,
      1,
      MOCK_ROOM_ENTITY_POSITIONS
    );

    const APCostsForPath = getApCostForPath(paths);

    // Starting position should not be in the costs
    expect(APCostsForPath.get('3,3')).toBeUndefined();

    // Target position should be in the costs
    expect(APCostsForPath.get('3,4')).toBe(1);
    expect(APCostsForPath.get('3,5')).toBe(1);
    expect(APCostsForPath.get('3,6')).toBeUndefined();

    return true;
  });
});
