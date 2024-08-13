import { findPathsFromCurrentLocation, getApCostForPath } from './pathfinding';
import { describe, expect, it } from 'vitest';
import { initRoomWithOnlyFloors } from './room';
import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

const MOCK_ROOM = initRoomWithOnlyFloors(11);
const MOCK_EMPTY_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
  new Map();

describe('Pathfinding and cost for Movement', () => {
  it('returns the path with no entities without walls', () => {
    const startPos: [number, number] = [3, 3];

    const paths = findPathsFromCurrentLocation(
      startPos,
      MOCK_ROOM,
      1,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS
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

  it('returns the path with no entities with walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomWithWalls = initRoomWithOnlyFloors(7);
    roomWithWalls[2][4] = [TILE_TYPE.WALL, 1];
    roomWithWalls[3][4] = [TILE_TYPE.WALL, 1];
    roomWithWalls[4][5] = [TILE_TYPE.WALL, 1];

    const paths = findPathsFromCurrentLocation(
      startPos,
      roomWithWalls,
      1,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS
    );

    // Starting position should not be in the paths
    expect(paths.get('3,3')).toBeUndefined();

    // Target position should be in the paths
    expect(paths.get('3,4')).toBeUndefined();
    expect(paths.get('3,5')).toStrictEqual([
      [4, 4],
      [3, 5],
    ]);
    expect(paths.get('3,6')).toBeUndefined();

    return true;
  });

  it('returns the path with just the player entity without walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);

    const paths = findPathsFromCurrentLocation(
      startPos,
      MOCK_ROOM,
      1,
      roomEntityPositions
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

  it('returns the path with player and enemy entities without walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
    roomEntityPositions.set('3,4', [ENTITY_TYPE.ENEMY, 1]);
    roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);

    const paths = findPathsFromCurrentLocation(
      startPos,
      MOCK_ROOM,
      1,
      roomEntityPositions
    );

    // Starting position should not be in the paths
    expect(paths.get('3,3')).toBeUndefined();

    // Tiles with entities should not be in the paths
    expect(paths.get('3,4')).toBeUndefined();
    expect(paths.get('3,5')).toBeUndefined();
    expect(paths.get('3,6')).toBeUndefined();

    // Tiles around the entities should be in the paths
    expect(paths.get('3,2')).toStrictEqual([[3, 2]]);
    expect(paths.get('3,1')).toStrictEqual([
      [3, 2],
      [3, 1],
    ]);

    return true;
  });

  it('returns the path with player and enemy entities with walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomWithWalls = initRoomWithOnlyFloors(7);
    roomWithWalls[2][2] = [TILE_TYPE.WALL, 1];
    roomWithWalls[3][2] = [TILE_TYPE.WALL, 1];
    roomWithWalls[4][2] = [TILE_TYPE.WALL, 1];

    const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
    roomEntityPositions.set('3,4', [ENTITY_TYPE.ENEMY, 1]);
    roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);

    const paths = findPathsFromCurrentLocation(
      startPos,
      roomWithWalls,
      1,
      roomEntityPositions
    );

    console.log(roomWithWalls);

    // Starting position should not be in the paths
    expect(paths.get('3,3')).toBeUndefined();

    // Tiles with entities should not be in the paths
    expect(paths.get('3,4')).toBeUndefined();
    expect(paths.get('3,5')).toBeUndefined();
    expect(paths.get('3,6')).toBeUndefined();

    // Tiles with walls should not be in the paths
    expect(paths.get('2,2')).toBeUndefined();
    expect(paths.get('3,2')).toBeUndefined();
    expect(paths.get('4,2')).toBeUndefined();

    // Tiles around the entities and walls should be in the paths
    expect(paths.get('2,3')).toStrictEqual([[2, 3]]);
    expect(paths.get('1,3')).toStrictEqual([
      [2, 3],
      [1, 3],
    ]);
    expect(paths.get('4,3')).toStrictEqual([[4, 3]]);
    expect(paths.get('5,3')).toStrictEqual([
      [4, 3],
      [5, 3],
    ]);

    return true;
  });

  it('returns the AP cost for the path', () => {
    const startPos: [number, number] = [3, 3];

    const paths = findPathsFromCurrentLocation(
      startPos,
      MOCK_ROOM,
      1,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS
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
