import { ENTITY_TYPE } from './constants/entity';
import { TILE_SIZE, TILE_TYPE } from './constants/tile';
import { IEnemy, IEntity, IPlayer, IStatus } from './types';

/**
 * Generate initial room matrix based on the room length
 * @param roomLength number (integer) representing the length of the room matrix
 * @returns a 2D array of tuples (TILE_TYPE, number) representing the type of tile and the id of whatever the tile is in the  room matrix
 *          ex - 2d array of 5x5 room matrix:
 *         [
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.DOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR,1 ], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.PLAYER, 1], [TILE_TYPE.FLOOR, 1], [TILE_TYPE.WALL, 1]],
 *          [[TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.DOOR, 1], [TILE_TYPE.WALL, 1], [TILE_TYPE.WALL, 1]]
 *          ]
 */
export const generateRoomTileMatrix = (roomLength: number) => {
  // Initialize room matrix
  const roomTileMatrix: [TILE_TYPE, number][][] = Array.from(
    { length: roomLength },
    () => Array.from({ length: roomLength }, () => [TILE_TYPE.FLOOR, 1])
  );

  // Generate room layout
  for (let row = 0; row < roomLength; row++) {
    for (let col = 0; col < roomLength; col++) {
      // Surround room with walls and place door in the middle of the top wall and bottom wall
      if (
        row === 0 ||
        row === 1 ||
        row === roomLength - 1 ||
        col === 0 ||
        col === roomLength - 1
      ) {
        if (
          (row === 0 || row === 1) &&
          [
            Math.floor(roomLength / 2),
            Math.floor(roomLength / 2) - 1,
            Math.floor(roomLength / 2) + 1,
          ].includes(col)
        ) {
          // roomTileMatrix[row][col] = [TILE_TYPE.DOOR, 366];

          if (row === 0) {
            // First row
            if (col === Math.floor(roomLength / 2)) {
              // Middle
              roomTileMatrix[row][col] = [TILE_TYPE.WALL, 366];
            } else if (col === Math.floor(roomLength / 2) - 1) {
              // Left of middle
              roomTileMatrix[row][col] = [TILE_TYPE.WALL, 365];
            } else {
              // Right of middle
              roomTileMatrix[row][col] = [TILE_TYPE.WALL, 367];
            }
          } else {
            // Second row
            if (col === Math.floor(roomLength / 2)) {
              // Middle
              roomTileMatrix[row][col] = [TILE_TYPE.DOOR, 397];
            } else if (col === Math.floor(roomLength / 2) - 1) {
              // Left of middle
              roomTileMatrix[row][col] = [TILE_TYPE.WALL, 396];
            } else {
              // Right of middle
              roomTileMatrix[row][col] = [TILE_TYPE.WALL, 398];
            }
          }
        } else {
          // Place corners
          if (row === 0 && col === 0) {
            // Top left corner
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 4];
          } else if (row === 0 && col === roomLength - 1) {
            // Top right corner
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 6];
          } else if (row === roomLength - 1 && col === 0) {
            // Bottom left corner
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 93];
          } else if (row === roomLength - 1 && col === roomLength - 1) {
            // Bottom right corner
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 95];
          }

          // Place non-corner walls
          else if (row === 0 && col !== 0 && col !== roomLength - 1) {
            // Top wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 5];
          } else if (row === 1 && col > 0 && col < roomLength - 1) {
            // Top wall - 1
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 35];
          } else if (row === 1 && col === 0) {
            // Top wall - 1 left wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 34];
          } else if (row === 1 && col === roomLength - 1) {
            // Top wall - 1 right wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 36];
          } else if (
            row === roomLength - 1 &&
            col !== 0 &&
            col !== roomLength - 1
          ) {
            // Bottom wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 2];
          } else if (col === 0 && row !== 0 && row !== roomLength - 1) {
            // Left wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 66];
          } else if (
            col === roomLength - 1 &&
            row !== 0 &&
            row !== roomLength - 1
          ) {
            // Right wall
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 67];
          } else {
            roomTileMatrix[row][col] = [TILE_TYPE.WALL, 1];
          }
        }
      } else {
        // Place floors everywhere else
        roomTileMatrix[row][col] = [TILE_TYPE.FLOOR, 1];
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
  roomEntityPositions.set(`3,8`, [ENTITY_TYPE.ENEMY, 3]); // Enemy in 2n1e of player in a 11x11 room
  roomEntityPositions.set(`3,2`, [ENTITY_TYPE.ENEMY, 4]); // Enemy in top left of room in a 11x11 room

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
    const filteredStatuses = newStatuses.filter((status) => {
      if (status.durationCounter <= 0) {
        displayStatusEffect(status, false, `${player.entityType}_${player.id}`);
        return false;
      }
      return true;
    });

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

/**
 * Get entity position in room matrix
 * @param entity Entity to get position of
 * @param entityPositions Map of entity positions in room
 * @returns a tuple of row and column representing the position of the entity in the room matrix
 *          and [-1, -1] if entity is not found in the room matrix
 */
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

export const getPlayerTotalStrength = (player: IPlayer) => {
  const weaponStrength = player.equipment.weapon?.stats.strength || 0;
  const helmetStrength = player.equipment.helmet?.stats.strength || 0;
  const chestpieceStrength = player.equipment.chestpiece?.stats.strength || 0;
  const leggingStrength = player.equipment.legging?.stats.strength || 0;

  const totalStrength =
    weaponStrength + helmetStrength + chestpieceStrength + leggingStrength;

  // 0, 0, 1, 1, 0.6, 1.2 = 0.8
  const strengthMultiplier = player.statuses.reduce((acc, status) => {
    // console.log('status', status);

    if (status.effect.strengthMultiplier === 0) return acc;

    if (status.effect.strengthMultiplier > 1) {
      return acc + (status.effect.strengthMultiplier - 1);
    } else {
      return acc - (1 - status.effect.strengthMultiplier);
    }
  }, 1);

  // console.log('strengthMultiplier', strengthMultiplier);

  return Math.round(totalStrength * strengthMultiplier);
};

export const getPlayerTotalIntelligence = (player: IPlayer) => {
  const weaponIntelligence = player.equipment.weapon?.stats.intelligence || 0;
  const helmetIntelligence = player.equipment.helmet?.stats.intelligence || 0;
  const chestpieceIntelligence =
    player.equipment.chestpiece?.stats.intelligence || 0;
  const leggingIntelligence = player.equipment.legging?.stats.intelligence || 0;

  const intelligenceMultiplier = player.statuses.reduce((acc, status) => {
    if (status.effect.intelligenceMultiplier === 0) return acc;

    if (status.effect.intelligenceMultiplier > 1) {
      return acc + (status.effect.intelligenceMultiplier - 1);
    } else {
      return acc - (1 - status.effect.intelligenceMultiplier);
    }
  }, 1);

  const totalIntelligence =
    weaponIntelligence +
    helmetIntelligence +
    chestpieceIntelligence +
    leggingIntelligence;

  return Math.round(totalIntelligence * intelligenceMultiplier);
};

export const getPlayerTotalDefense = (player: IPlayer) => {
  const weaponDefense = player.equipment.weapon?.stats.defense || 0;
  const helmetDefense = player.equipment.helmet?.stats.defense || 0;
  const chestpieceDefense = player.equipment.chestpiece?.stats.defense || 0;
  const leggingDefense = player.equipment.legging?.stats.defense || 0;

  // Get defense from status effects
  const totalDefenseFromStatuses = player.statuses.reduce(
    (acc, status) => acc + status.effect.incomingDamageReduction,
    0
  );

  const defenseMultiplier = player.statuses.reduce((acc, status) => {
    if (status.effect.defenseMultiplier === 0) return acc;

    if (status.effect.defenseMultiplier > 1) {
      return acc + (status.effect.defenseMultiplier - 1);
    } else {
      return acc - (1 - status.effect.defenseMultiplier);
    }
  }, 1);

  const equipmentDefense =
    weaponDefense + helmetDefense + chestpieceDefense + leggingDefense;

  return (
    Math.round(equipmentDefense * defenseMultiplier) + totalDefenseFromStatuses
  );
};

export const getPlayerLifestealMultiplier = (player: IPlayer) => {
  const lifestealMultiplier = player.statuses.reduce(
    (acc, status) => acc + status.effect.lifesteal,
    0
  );

  return lifestealMultiplier;
};

export const damageEntity = (
  entity: IPlayer | IEnemy,
  damage: number,
  entitySpriteID: string
) => {
  // console.log('damageEntity', entity, damage, entitySpriteID);
  const newHealth = entity.health - damage;

  // Display damage numbers
  displayDamageNumbers(entitySpriteID, damage);

  return newHealth;
};

const displayDamageNumbers = (entitySpriteID: string, damage: number) => {
  // Find sprite position
  const sprite = document.querySelector(`#${entitySpriteID}`);
  if (!sprite) {
    console.error('displayDamageNumbers: Sprite not found');
    return;
  }
  const spriteX = sprite.getBoundingClientRect().left;
  const spriteY = sprite.getBoundingClientRect().top;
  const spriteWidth = sprite.getBoundingClientRect().width;

  // Display damage numbers
  const damageNumbers = document.createElement('h1');
  damageNumbers.textContent = `-${damage}`;

  // Construct damage numbers and add it to the document body
  damageNumbers.style.fontWeight = 'bold';
  damageNumbers.style.fontSize = '1.5rem';
  document.body.appendChild(damageNumbers);

  damageNumbers.style.position = 'absolute';
  damageNumbers.style.top = `${spriteY - TILE_SIZE / 2}px`;
  damageNumbers.style.left = `${spriteX + spriteWidth / 2 - damageNumbers.getBoundingClientRect().width / 2}px`;
  damageNumbers.style.zIndex = '100';
  damageNumbers.style.color = 'red';

  damageNumbers.classList.add('animate-floatUpAndFadeOut');

  // Remove damage numbers after 1.5 seconds
  setTimeout(() => {
    damageNumbers.remove();
  }, 1500);
};

export const healEntity = (
  entity: IPlayer | IEnemy,
  healAmount: number,
  entitySpriteID: string
) => {
  // console.log('damageEntity', entity, heal, entitySpriteID);
  const newHealth = entity.health + healAmount;

  // Display heal numbers
  displayHealNumbers(entitySpriteID, healAmount);

  return newHealth;
};

const displayHealNumbers = (entitySpriteID: string, heal: number) => {
  // Find sprite position
  const sprite = document.querySelector(`#${entitySpriteID}`);
  if (!sprite) {
    console.error('displayDamageNumbers: Sprite not found');
    return;
  }
  const spriteX = sprite.getBoundingClientRect().left;
  const spriteY = sprite.getBoundingClientRect().top;
  const spriteWidth = sprite.getBoundingClientRect().width;

  // Display heal numbers
  const healNumbers = document.createElement('h1');
  healNumbers.textContent = `-${heal}`;

  // Construct heal numbers and add it to the document body
  healNumbers.style.fontWeight = 'bold';
  healNumbers.style.fontSize = '1.5rem';
  document.body.appendChild(healNumbers);

  healNumbers.style.position = 'absolute';
  healNumbers.style.top = `${spriteY - TILE_SIZE / 2}px`;
  healNumbers.style.left = `${spriteX + spriteWidth / 2 - healNumbers.getBoundingClientRect().width / 2}px`;
  healNumbers.style.zIndex = '100';
  healNumbers.style.color = 'green';

  healNumbers.classList.add('animate-floatUpAndFadeOut');

  // Remove heal numbers after 1.5 seconds
  setTimeout(() => {
    healNumbers.remove();
  }, 1500);
};

export const displayStatusEffect = (
  status: IStatus,
  gain: boolean,
  entitySpriteID: string
) => {
  // Find sprite position
  const sprite = document.querySelector(`#${entitySpriteID}`);
  if (!sprite) {
    console.error('displayDamageNumbers: Sprite not found');
    return;
  }
  const spriteX = sprite.getBoundingClientRect().left;
  const spriteY = sprite.getBoundingClientRect().top;
  const spriteWidth = sprite.getBoundingClientRect().width;

  // Display status effect
  const statusIndicator = document.createElement('div');
  statusIndicator.textContent = gain ? `+ ${status.name}` : `- ${status.name}`;

  // Construct status effect and add it to the document body
  statusIndicator.style.fontWeight = 'bold';
  statusIndicator.style.fontSize = '1.5rem';
  document.body.appendChild(statusIndicator);

  statusIndicator.style.position = 'absolute';
  statusIndicator.style.top = `${spriteY - TILE_SIZE}px`;
  statusIndicator.style.left = `${spriteX + spriteWidth / 2 - statusIndicator.getBoundingClientRect().width / 2}px`;
  statusIndicator.style.zIndex = '100';
  statusIndicator.style.color = gain ? 'green' : 'red';

  statusIndicator.classList.add('animate-floatUpAndFadeOut');

  // Remove status effect after 1.5 seconds
  setTimeout(() => {
    statusIndicator.remove();
  }, 1500);
};