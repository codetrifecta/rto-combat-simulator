import { ENTITY_TYPE, STARTING_MAX_HEALTH } from '../constants/entity';
import { TILE_SIZE } from '../constants/tile';
import { IEnemy, IEntity, IPlayer, IStatus } from '../types';

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
        displayStatusEffect(
          status,
          false,
          `tile_${player.entityType}_${player.id}`
        );
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

export const getPlayerMaxHealth = (player: IPlayer) => {
  const weaponMaxConstitution =
    player.equipment.weapon?.stats.constitution || 0;
  const helmetMaxConstitution =
    player.equipment.helmet?.stats.constitution || 0;
  const chestpieceMaxConstitution =
    player.equipment.chestpiece?.stats.constitution || 0;
  const leggingMaxConstitution =
    player.equipment.legging?.stats.constitution || 0;

  const totalMaxConstitution =
    STARTING_MAX_HEALTH +
    weaponMaxConstitution +
    helmetMaxConstitution +
    chestpieceMaxConstitution +
    leggingMaxConstitution;

  return totalMaxConstitution;
};

export const getEntityDodgeChance = (entity: IEntity) => {
  const dodgeChance = entity.statuses.reduce(
    (acc, status) => acc + status.effect.dodgeChance,
    0
  );

  return dodgeChance;
};

export const damageEntity = (
  entity: IPlayer | IEnemy,
  damage: number,
  elementID: string
): number => {
  // console.log('damageEntity', entity, damage, elementID);
  const newHealth = entity.health - damage;

  // Change entity sprite to damaged sprite animation
  if (entity.entityType === ENTITY_TYPE.PLAYER) {
    console.log('Change entity to damaged sprite animation');
    const playerSpriteSheetContainer = document.getElementById(
      `spritesheet_container_${entity.entityType}_${entity.id}`
    );

    if (!playerSpriteSheetContainer) {
      console.error('Player spritesheet container not found!');
      return newHealth;
    }

    // Set entity animation to damaged by changing animation speed,
    // and shifting position downwards on the spritesheet
    const topPosition =
      -entity.spriteSize * entity.spritesheetDamagedRow + 'px';
    if (
      playerSpriteSheetContainer.classList.contains(
        'animate-entityAnimateLeft20'
      )
    ) {
      playerSpriteSheetContainer.classList.remove(
        'animate-entityAnimateLeft20'
      );
      playerSpriteSheetContainer.style.top = topPosition;
      playerSpriteSheetContainer.style.left = entity.spriteSize + 'px';

      setTimeout(() => {
        playerSpriteSheetContainer.classList.add('animate-entityAnimateLeft08');
      }, 1);
    } else {
      playerSpriteSheetContainer.classList.remove('animate-entityAnimate20');
      playerSpriteSheetContainer.style.top = topPosition;
      playerSpriteSheetContainer.style.left = 0 + 'px';

      setTimeout(() => {
        playerSpriteSheetContainer.classList.add('animate-entityAnimate08');
      }, 1);
    }
  } else {
    console.log('Change entity to damaged sprite animation');

    const enemySpriteSheetContainer = document.getElementById(
      `spritesheet_container_${entity.entityType}_${entity.id}`
    );

    if (!enemySpriteSheetContainer) {
      console.error('Enemy spritesheet container not found!');
      return newHealth;
    }

    // Depending on enemy health, play either damaged or defeat animation
    if (newHealth > 0) {
      const topPosition =
        -entity.spriteSize * entity.spritesheetDamagedRow + 'px';
      if (
        enemySpriteSheetContainer.classList.contains(
          'animate-entityAnimateLeft08'
        )
      ) {
        enemySpriteSheetContainer.classList.remove(
          'animate-entityAnimateLeft08'
        );
        enemySpriteSheetContainer.style.left = entity.spriteSize + 'px';
        enemySpriteSheetContainer.style.top = topPosition;

        setTimeout(() => {
          enemySpriteSheetContainer.classList.add(
            'animate-entityAnimateLeft08'
          );
        }, 1);
      } else {
        enemySpriteSheetContainer.classList.remove('animate-entityAnimate08');
        enemySpriteSheetContainer.style.left = 0 + 'px';
        enemySpriteSheetContainer.style.top = topPosition;

        setTimeout(() => {
          enemySpriteSheetContainer.classList.add('animate-entityAnimate08');
        }, 1);
      }
    } else {
      const topPosition =
        -entity.spriteSize * entity.spritesheetDefeatRow + 'px';
      if (
        enemySpriteSheetContainer.classList.contains(
          'animate-entityAnimateLeft08'
        )
      ) {
        enemySpriteSheetContainer.classList.remove(
          'animate-entityAnimateLeft08'
        );
        enemySpriteSheetContainer.style.top = topPosition;
        enemySpriteSheetContainer.style.left = entity.spriteSize + 'px';

        setTimeout(() => {
          enemySpriteSheetContainer.classList.add(
            'animate-entityAnimateLeftOnce08'
          );
        }, 1);
      } else {
        enemySpriteSheetContainer.classList.remove('animate-entityAnimate08');
        enemySpriteSheetContainer.style.top = topPosition;
        enemySpriteSheetContainer.style.left = 0 + 'px';

        setTimeout(() => {
          enemySpriteSheetContainer.classList.add(
            'animate-entityAnimateOnce08'
          );
        }, 1);
      }
    }
  }

  setTimeout(() => {
    console.log('Revert entity back to idle or defeat sprite animation');

    // Revert entity back to idle sprite animation
    if (entity.entityType === ENTITY_TYPE.PLAYER) {
      const playerSpriteSheetContainer = document.getElementById(
        `spritesheet_container_${entity.entityType}_${entity.id}`
      );

      if (!playerSpriteSheetContainer) {
        console.error('Player spritesheet container not found!');
        return newHealth;
      }

      // Set entity animation to walking by increasing animtions sprite x axis change speed and shifting position upwards on the spritesheet
      if (newHealth > 0) {
        const topPosition =
          -entity.spriteSize * entity.spritesheetIdleRow + 'px';
        if (
          playerSpriteSheetContainer.classList.contains(
            'animate-entityAnimateLeft08'
          )
        ) {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          playerSpriteSheetContainer.style.top = topPosition;
          playerSpriteSheetContainer.style.left = entity.spriteSize + 'px';

          setTimeout(() => {
            playerSpriteSheetContainer.classList.add(
              'animate-entityAnimateLeft20'
            );
          }, 1);
        } else {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimate08'
          );
          playerSpriteSheetContainer.style.top = topPosition;
          playerSpriteSheetContainer.style.left = 0 + 'px';

          setTimeout(() => {
            playerSpriteSheetContainer.classList.add('animate-entityAnimate20');
          }, 1);
        }
      } else {
        // Set entity animation to defeated by increasing animtions sprite x axis change speed and shifting position upwards on the spritesheet
        const topPosition =
          -entity.spriteSize * entity.spritesheetDefeatRow + 'px';
        if (
          playerSpriteSheetContainer.classList.contains(
            'animate-entityAnimateLeft08'
          )
        ) {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          playerSpriteSheetContainer.style.top = topPosition;
          playerSpriteSheetContainer.style.left = entity.spriteSize + 'px';

          setTimeout(() => {
            playerSpriteSheetContainer.classList.add(
              'animate-entityAnimateLeft20'
            );
          }, 1);
        } else {
          playerSpriteSheetContainer.classList.remove(
            'animate-entityAnimate08'
          );
          playerSpriteSheetContainer.style.top = topPosition;
          playerSpriteSheetContainer.style.left = 0 + 'px';

          setTimeout(() => {
            playerSpriteSheetContainer.classList.add('animate-entityAnimate20');
          }, 1);
        }
      }
    } else {
      // ENEMY
      console.log('Set enemy animation to defeated sprite animation');
      const enemySpriteSheetContainer = document.getElementById(
        `spritesheet_container_${entity.entityType}_${entity.id}`
      );

      if (!enemySpriteSheetContainer) {
        console.error('Enemy spritesheet container not found!');
        return newHealth;
      }

      if (newHealth > 0) {
        // Set entity animation to idle
        const topPosition =
          -entity.spriteSize * entity.spritesheetIdleRow + 'px';
        if (
          enemySpriteSheetContainer.classList.contains(
            'animate-entityAnimateLeft08'
          )
        ) {
          enemySpriteSheetContainer.classList.remove(
            'animate-entityAnimateLeft08'
          );
          enemySpriteSheetContainer.style.top = topPosition;
          enemySpriteSheetContainer.style.left = entity.spriteSize + 'px';

          setTimeout(() => {
            enemySpriteSheetContainer.classList.add(
              'animate-entityAnimateLeft08'
            );
          }, 1);
        } else {
          enemySpriteSheetContainer.classList.remove('animate-entityAnimate08');
          enemySpriteSheetContainer.style.top = topPosition;
          enemySpriteSheetContainer.style.left = 0 + 'px';

          setTimeout(() => {
            enemySpriteSheetContainer.classList.add('animate-entityAnimate08');
          }, 1);
        }
      } else {
        console.log('SET ENTITY SPRITE TO DEFEATED');
      }
    }
  }, 800);

  // Display damage numbers
  displayDamageNumbers(elementID, damage);

  return newHealth;
};

export const displayGeneralMessage = (elementID: string, message: string) => {
  // Find tile position of sprite
  const tile = document.getElementById(`${elementID}`);

  // Find room element
  const entitySpritePositions = document.getElementById(
    'entity_sprite_positions'
  );

  if (!tile) {
    console.error('displayStatusEffect: Tile not found');
    return;
  }

  if (!entitySpritePositions) {
    console.error('displayStatusEffect: entitySpritePositions not found');
    return;
  }

  // Get position of tile relative to the parent element
  const tileLeftPosition = tile.offsetLeft;
  const tileTopPosition = tile.offsetTop;

  // Display message numbers
  const messageDisplay = document.createElement('h1');
  messageDisplay.textContent = message;

  // Construct message numbers and add it to the document body
  messageDisplay.style.fontWeight = 'bold';
  messageDisplay.style.fontSize = '1.5rem';
  messageDisplay.style.whiteSpace = 'nowrap';
  entitySpritePositions.appendChild(messageDisplay);

  messageDisplay.style.position = 'absolute';
  messageDisplay.style.top = `${tileTopPosition - TILE_SIZE}px`;
  messageDisplay.style.left = `${tileLeftPosition + (TILE_SIZE / 2 - messageDisplay.offsetWidth / 2)}px`;
  messageDisplay.style.zIndex = '100';
  messageDisplay.style.color = 'white';

  messageDisplay.classList.add('animate-floatUpAndFadeOut20');

  // Remove message numbers after 1.5 seconds
  setTimeout(() => {
    messageDisplay.remove();
  }, 2000);
};

const displayDamageNumbers = (elementID: string, damage: number) => {
  // Find tile position of sprite
  const tile = document.getElementById(`${elementID}`);

  // Find room element
  const entitySpritePositions = document.getElementById(
    'entity_sprite_positions'
  );

  if (!tile) {
    console.error('displayStatusEffect: Tile not found');
    return;
  }

  if (!entitySpritePositions) {
    console.error('displayStatusEffect: entitySpritePositions not found');
    return;
  }

  // Get position of tile relative to the parent element
  const tileLeftPosition = tile.offsetLeft;
  const tileTopPosition = tile.offsetTop;

  // Display damage numbers
  const damageNumbers = document.createElement('h1');
  damageNumbers.textContent = `-${damage}`;

  // Construct damage numbers and add it to the document body
  damageNumbers.style.fontWeight = 'bold';
  damageNumbers.style.fontSize = '1.5rem';
  damageNumbers.style.whiteSpace = 'nowrap';
  entitySpritePositions.appendChild(damageNumbers);

  damageNumbers.style.position = 'absolute';
  damageNumbers.style.top = `${tileTopPosition - TILE_SIZE * 1.5}px`;
  damageNumbers.style.left = `${tileLeftPosition + (TILE_SIZE / 2 - damageNumbers.offsetWidth / 2)}px`;
  damageNumbers.style.zIndex = '100';
  damageNumbers.style.color = 'red';

  damageNumbers.classList.add('animate-floatUpAndFadeOut20');

  // Remove damage numbers after 1.5 seconds
  setTimeout(() => {
    damageNumbers.remove();
  }, 2000);
};

export const healEntity = (
  entity: IPlayer | IEnemy,
  healAmount: number,
  elementID: string
) => {
  // console.log('damageEntity', entity, heal, elementID);
  const newHealth = entity.health + healAmount;

  // Display heal numbers
  displayHealNumbers(elementID, healAmount);

  return newHealth;
};

const displayHealNumbers = (elementID: string, heal: number) => {
  // Find tile position of sprite
  const tile = document.getElementById(`${elementID}`);

  // Find room element
  const entitySpritePositions = document.getElementById(
    'entity_sprite_positions'
  );

  if (!tile) {
    console.error('displayHealNumbers: Tile not found');
    return;
  }

  if (!entitySpritePositions) {
    console.error('displayHealNumbers: entitySpritePositions not found');
    return;
  }

  // Get position of tile relative to the parent element
  const tileLeftPosition = tile.offsetLeft;
  const tileTopPosition = tile.offsetTop;

  // Display heal numbers
  const healNumbers = document.createElement('h1');
  healNumbers.textContent = `+${heal}`;

  // Construct heal numbers and add it to the document body
  healNumbers.style.fontWeight = 'bold';
  healNumbers.style.fontSize = '1.5rem';
  healNumbers.style.whiteSpace = 'nowrap';
  entitySpritePositions.appendChild(healNumbers);

  healNumbers.style.position = 'absolute';
  healNumbers.style.top = `${tileTopPosition - TILE_SIZE * 1.5}px`;
  healNumbers.style.left = `${tileLeftPosition + TILE_SIZE / 2 - healNumbers.offsetWidth / 2}px`;
  healNumbers.style.zIndex = '100';
  healNumbers.style.color = 'green';

  healNumbers.classList.add('animate-floatUpAndFadeOut20');

  // Remove heal numbers after 1.5 seconds
  setTimeout(() => {
    healNumbers.remove();
  }, 2000);
};

export const displayStatusEffect = (
  status: IStatus,
  gain: boolean,
  elementID: string
) => {
  // Find tile position of sprite
  const tile = document.getElementById(`${elementID}`);

  // Find room element
  const entitySpritePositions = document.getElementById(
    'entity_sprite_positions'
  );

  if (!tile) {
    console.error('displayStatusEffect: Tile not found');
    return;
  }

  if (!entitySpritePositions) {
    console.error('displayStatusEffect: entitySpritePositions not found');
    return;
  }

  // Get position of tile relative to the parent element
  const tileLeftPosition = tile.offsetLeft;
  const tileTopPosition = tile.offsetTop;

  // console.log(
  //   'displayStatusEffect',
  //   status,
  //   gain,
  //   elementID,
  //   tileLeftPosition,
  //   tileTopPosition
  // );

  // Display status effect
  const statusIndicator = document.createElement('h1');
  statusIndicator.textContent = gain ? `+ ${status.name}` : `- ${status.name}`;

  // Construct status effect and add it to the document body
  statusIndicator.style.fontWeight = 'bold';
  statusIndicator.style.fontSize = '1.5rem';
  statusIndicator.style.whiteSpace = 'nowrap';
  entitySpritePositions.appendChild(statusIndicator);

  statusIndicator.style.position = 'absolute';
  statusIndicator.style.top = `${tileTopPosition - TILE_SIZE}px`;
  statusIndicator.style.left = `${tileLeftPosition + (TILE_SIZE / 2 - statusIndicator.offsetWidth / 2)}px`;
  statusIndicator.style.zIndex = '100';
  statusIndicator.style.color = 'yellow';

  statusIndicator.classList.add('animate-floatUpAndFadeOut20');

  // Remove status effect after 1.5 seconds
  setTimeout(() => {
    statusIndicator.remove();
  }, 2000);
};

export const getPotionHealAmount = (player: IPlayer) => {
  const newPlayer = { ...player };

  // Potion heal percentage
  const healPercentage = 0.5;
  const healAmount = Math.round(newPlayer.maxHealth * healPercentage);

  return healAmount;
};