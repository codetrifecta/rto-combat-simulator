import { ENTITY_TYPE } from './constants/entity';
import { TILE_TYPE } from './constants/tile';
import { IEnemy, IEntity, IPlayer } from './types';

/**
 * Generate initial room matrix based on the room length
 * @param roomLength number (integer) representing the length of the room matrix
 * @returns a 2D array of tuples (TILE_TYPE, number) representing the type of tile and the id of whatever the tile is in the  room matrix
 *          ex - 2d array of 5x5 room matrix:
 *         [
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.DOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.ENEMY, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.EMPTY,1 ], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.PLAYER, 1], [TILE_TYPE.EMPTY, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.DOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1]]
 *          ]
 */
export const generateRoomTileMatrix = (roomLength: number) => {
  // Initialize room matrix
  const roomTileMatrix: [TILE_TYPE, number][][] = Array.from(
    { length: roomLength },
    () => Array.from({ length: roomLength }, () => [TILE_TYPE.EMPTY, 0])
  );

  // Generate room layout
  for (let row = 0; row < roomLength; row++) {
    for (let col = 0; col < roomLength; col++) {
      // Surround room with walls and place door in the middle of the top wall and bottom wall
      if (
        row === 0 ||
        row === roomLength - 1 ||
        col === 0 ||
        col === roomLength - 1
      ) {
        if (col === Math.floor(roomLength / 2)) {
          roomTileMatrix[row][col] = [TILE_TYPE.DOOR, 1];
        } else {
          roomTileMatrix[row][col] = [TILE_TYPE.WALL, 1];
        }
      } else {
        // Place walls everywhere else
        roomTileMatrix[row][col] = [TILE_TYPE.EMPTY, 1];
      }
    }
  }

  return roomTileMatrix;
};

/**
 * Generate initial room entity positions
 * @returns a map of entity type and id to position
 */
export const generateRoomEntityPositions: () => Map<
  string,
  [ENTITY_TYPE, number]
> = () => {
  const roomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(); // Map of entity type and id to position

  // Place entities in the room
  // Place player
  roomEntityPositions.set(`9,5`, [ENTITY_TYPE.PLAYER, 1]);

  // Place enemies (that match the number of enemies specified in enemy store)
  roomEntityPositions.set(`7,4`, [ENTITY_TYPE.ENEMY, 1]); // Enemy in direct top-left of player in a 11x11 room
  roomEntityPositions.set(`6,6`, [ENTITY_TYPE.ENEMY, 2]); // Enemy in direct top-left of player in a 11x11 room
  roomEntityPositions.set(`2,8`, [ENTITY_TYPE.ENEMY, 3]); // Enemy in 2n1e of player in a 11x11 room
  roomEntityPositions.set(`2,2`, [ENTITY_TYPE.ENEMY, 4]); // Enemy in top left of room in a 11x11 room

  return roomEntityPositions;
};

/**
 * Update room entity positions
 * @param newPos new position
 * @param currentPos current position
 * @param prevEntityPositions previous entity positions
 * @returns an updated map of entity type and id to position
 */
export const updateRoomEntityPositions: (
  newPos: [number, number],
  currentPos: [number, number],
  prevEntityPositions: Map<string, [ENTITY_TYPE, number]>
) => Map<string, [ENTITY_TYPE, number]> = (
  newPos,
  currentPos,
  prevEntityPositions
) => {
  const newRoomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(
    prevEntityPositions
  );

  // Get entity at current position
  const entity = newRoomEntityPositions.get(
    `${currentPos[0]},${currentPos[1]}`
  );

  if (!entity) {
    return newRoomEntityPositions;
  }

  // Update entity position
  newRoomEntityPositions.delete(`${currentPos[0]},${currentPos[1]}`);
  newRoomEntityPositions.set(`${newPos[0]},${newPos[1]}`, entity);

  return newRoomEntityPositions;
};

/**
 * Handle player end turn
 * @param turnCycle IEntity[] representing the turn cycle
 * @param getPlayer function to get the player
 * @param setPlayer function to set the player
 * @param endTurn   function to end the turn
 */
export const handlePlayerEndTurn = (
  turnCycle: IEntity[],
  getPlayer: () => IPlayer,
  setPlayer: (player: IPlayer) => void,
  endTurn: () => void
) => {
  // If current turn is player, end player's turn and give action points and reduce skill cooldown and status effects duration
  if (turnCycle[0] && turnCycle[0].entityType === ENTITY_TYPE.PLAYER) {
    const player = getPlayer();

    // Give action points
    const newActionPoints =
      player.actionPoints >= 2 ? 6 : player.actionPoints + 4;

    // Reduce skill cooldowns
    const newSkills = player.skills.map((skill) => {
      if (skill.cooldownCounter > 0) {
        return { ...skill, cooldownCounter: skill.cooldownCounter - 1 };
      }
      return skill;
    });

    // Reduce status effect durations
    const newStatuses = player.statuses.map((status) => {
      if (status.duration > 0) {
        return { ...status, durationCounter: status.durationCounter - 1 };
      }
      return status;
    });

    // Filter out the new statuses with duration 0
    const filteredStatuses = newStatuses.filter(
      (status) => status.durationCounter > 0
    );

    // Update player
    setPlayer({
      ...player,
      actionPoints: newActionPoints,
      skills: newSkills,
      statuses: filteredStatuses,
    });
  }

  endTurn();
};

/**
 * Check if entity is a player
 * @param entity IEntity | IPlayer | IEnemy
 * @returns boolean indicating if entity is a player
 */
export const isPlayer = (
  entity: IEntity | IPlayer | IEnemy
): entity is IPlayer => {
  return entity.entityType === ENTITY_TYPE.PLAYER;
};

/**
 * Check if entity is an enemy
 * @param entity IEntity | IPlayer | IEnemy
 * @returns boolean indicating if entity is an enemy
 */
export const isEnemy = (
  entity: IEntity | IPlayer | IEnemy
): entity is IEnemy => {
  return entity.entityType === ENTITY_TYPE.ENEMY;
};

export const getEntityPosition = (
  entity: IEntity,
  entityPositions: Map<string, [ENTITY_TYPE, number]>
  // roomMatrix: [TILE_TYPE, number][][]
): [number, number] => {
  // Get entity position from entity positions map

  for (const [key, value] of entityPositions.entries()) {
    if (value[0] === entity.entityType && value[1] === entity.id) {
      const [row, col] = key.split(',').map((num) => parseInt(num));
      return [row, col];
    }
  }

  return [-1, -1];
};
