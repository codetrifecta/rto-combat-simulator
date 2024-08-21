import { findPathsFromCurrentLocation, getApCostForPath } from './pathfinding';
import { describe, expect, it } from 'vitest';
import { initRoomWithOnlyFloors, roomToStringArray } from './room';
import { ENTITY_TYPE } from '../constants/entity';
import { TILE_TYPE } from '../constants/tile';

const MOCK_ROOM = initRoomWithOnlyFloors(11);
const MOCK_EMPTY_ROOM_ENTITY_POSITIONS: Map<string, [ENTITY_TYPE, number]> =
  new Map();

describe('Pathfinding for Movement', () => {
  it('returns path without entities without walls', () => {
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

  it('returns path without entities with walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomWithWalls = initRoomWithOnlyFloors(7);
    roomWithWalls[2][4] = TILE_TYPE.WALL;
    roomWithWalls[3][4] = TILE_TYPE.WALL;
    roomWithWalls[4][5] = TILE_TYPE.WALL;

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

  it('returns path with just the player entity without walls', () => {
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

  it('returns path with player and enemy entities without walls', () => {
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

  it('returns path with player and enemy entities with walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomWithWalls = initRoomWithOnlyFloors(7);
    roomWithWalls[2][2] = TILE_TYPE.WALL;
    roomWithWalls[3][2] = TILE_TYPE.WALL;
    roomWithWalls[4][2] = TILE_TYPE.WALL;

    const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
    roomEntityPositions.set('3,4', [ENTITY_TYPE.ENEMY, 1]);
    roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);

    const paths = findPathsFromCurrentLocation(
      startPos,
      roomWithWalls,
      1,
      roomEntityPositions,
      2
    );

    // console.log(roomToStringArray(roomWithWalls, roomEntityPositions));

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

  it('returns path with player (with movement range of 3) and enemy entities with walls', () => {
    const startPos: [number, number] = [3, 3];

    const roomWithWalls = initRoomWithOnlyFloors(7);
    roomWithWalls[2][2] = TILE_TYPE.WALL;
    roomWithWalls[3][2] = TILE_TYPE.WALL;
    roomWithWalls[4][2] = TILE_TYPE.WALL;

    const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
    roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
    roomEntityPositions.set('3,4', [ENTITY_TYPE.ENEMY, 1]);
    roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);

    const paths = findPathsFromCurrentLocation(
      startPos,
      roomWithWalls,
      1,
      roomEntityPositions,
      3
    );

    // console.log(roomToStringArray(roomWithWalls, roomEntityPositions));

    // Starting position should not be in the paths
    expect(paths.get('3,3')).toBeUndefined();

    // Tiles with entities should not be in the paths
    expect(paths.get('3,4')).toBeUndefined();
    expect(paths.get('3,5')).toBeUndefined();

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
    expect(paths.get('3,6')).toStrictEqual([
      [2, 4],
      [2, 5],
      [3, 6],
    ]);

    // Tiles outside of movement range should not be in the paths
    expect(paths.get('3,7')).toBeUndefined();
    expect(paths.get('3,8')).toBeUndefined();

    return true;
  });
});

it('returns path with player (with movement range of 3) and enemy entities with walls', () => {
  const startPos: [number, number] = [3, 3];

  const roomWithWalls = initRoomWithOnlyFloors(7);
  roomWithWalls[2][2] = TILE_TYPE.WALL;
  roomWithWalls[3][2] = TILE_TYPE.WALL;
  roomWithWalls[4][2] = TILE_TYPE.WALL;

  const roomEntityPositions: Map<string, [ENTITY_TYPE, number]> = new Map();
  roomEntityPositions.set('3,3', [ENTITY_TYPE.PLAYER, 1]);
  roomEntityPositions.set('3,4', [ENTITY_TYPE.ENEMY, 1]);
  roomEntityPositions.set('3,5', [ENTITY_TYPE.ENEMY, 2]);

  const paths = findPathsFromCurrentLocation(
    startPos,
    roomWithWalls,
    1,
    roomEntityPositions,
    1
  );

  console.log(roomToStringArray(roomWithWalls, roomEntityPositions));

  // Starting position should not be in the paths
  expect(paths.get('3,3')).toBeUndefined();

  // Tiles with entities should not be in the paths
  expect(paths.get('3,4')).toBeUndefined();
  expect(paths.get('3,5')).toBeUndefined();

  // Tiles with walls should not be in the paths
  expect(paths.get('2,2')).toBeUndefined();
  expect(paths.get('3,2')).toBeUndefined();
  expect(paths.get('4,2')).toBeUndefined();

  // Tiles around the entities and walls should be in the paths
  expect(paths.get('2,3')).toStrictEqual([[2, 3]]);
  expect(paths.get('4,3')).toStrictEqual([[4, 3]]);

  // Tiles outside of movement range should not be in the paths
  expect(paths.get('1,3')).toBeUndefined();
  expect(paths.get('3,7')).toBeUndefined();
  expect(paths.get('3,8')).toBeUndefined();
  expect(paths.get('5,3')).toBeUndefined();
  expect(paths.get('3,6')).toBeUndefined();

  return true;
});

describe('AP Cost for Path', () => {
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

  it('returns the AP cost for the path with movement range of 3', () => {
    const startPos: [number, number] = [3, 3];

    const paths = findPathsFromCurrentLocation(
      startPos,
      MOCK_ROOM,
      2,
      MOCK_EMPTY_ROOM_ENTITY_POSITIONS,
      3
    );

    const APCostsForPath = getApCostForPath(paths, 3);

    // console.log(APCostsForPath);

    // Starting position should not be in the costs
    expect(APCostsForPath.get('3,3')).toBeUndefined();

    // Target position should be in the costs
    expect(APCostsForPath.get('3,4')).toBe(1);
    expect(APCostsForPath.get('3,5')).toBe(1);
    expect(APCostsForPath.get('3,6')).toBe(1);
    expect(APCostsForPath.get('3,7')).toBe(2);
    expect(APCostsForPath.get('3,8')).toBe(2);
    expect(APCostsForPath.get('3,9')).toBe(2);

    return true;
  });
});
