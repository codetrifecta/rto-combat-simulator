import { ENTITY_TYPE, TILE_TYPE } from "./constants";
import { IEnemy, IEntity, IPlayer } from "./types";

/**
 * Generate a room matrix based on the room length
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
export const generateRoomMatrix = (roomLength: number) => {
  // Initialize room matrix
  const initialRoomMatrix: [TILE_TYPE, number][][] = Array.from(
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
          initialRoomMatrix[row][col] = [TILE_TYPE.DOOR, 1];
        } else {
          initialRoomMatrix[row][col] = [TILE_TYPE.WALL, 1];
        }
      }
      // Place player in the bottom middle
      else if (
        row === Math.floor((roomLength / 4) * 3) &&
        col === Math.floor(roomLength / 2)
      ) {
        initialRoomMatrix[row][col] = [TILE_TYPE.PLAYER, 1];
      }
      // Place two enemies in quadrant 1 and 2
      else if (
        (row === Math.floor(roomLength / 4) &&
          col === Math.floor(roomLength / 4)) ||
        (row === Math.floor(roomLength / 4) &&
          col === Math.floor((roomLength / 4) * 3))
      ) {
        if (col === Math.floor(roomLength / 4)) {
          // initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 2];
        } else {
          initialRoomMatrix[row][col] = [TILE_TYPE.ENEMY, 1];
        }
      } else {
        // Place walls everywhere else
        initialRoomMatrix[row][col] = [TILE_TYPE.EMPTY, 1];
      }
    }
  }

  // Manually modify room matrix
  // initialRoomMatrix[8][5] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 13x13 room
  initialRoomMatrix[7][4] = [TILE_TYPE.ENEMY, 2]; // Enemy in direct top-left of player in a 11x11 room
  initialRoomMatrix[6][6] = [TILE_TYPE.ENEMY, 3]; // Enemy in 2n1e of player in a 11x11 room

  return initialRoomMatrix;
};

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
  roomMatrix: [TILE_TYPE, number][][]
): [number, number] => {
  for (let row = 0; row < roomMatrix.length; row++) {
    for (let col = 0; col < roomMatrix.length; col++) {
      const tile = roomMatrix[row][col];
      if (tile[1] === entity.id) {
        if (
          tile[0] === TILE_TYPE.PLAYER &&
          entity.entityType === ENTITY_TYPE.PLAYER
        ) {
          return [row, col];
        } else if (
          tile[0] === TILE_TYPE.ENEMY &&
          entity.entityType === ENTITY_TYPE.ENEMY
        ) {
          return [row, col];
        }
      }
    }
  }
  return [-1, -1];
};
